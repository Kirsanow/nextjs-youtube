"use server";
import { createClient } from "@/lib/supabase/server";
import { prompts } from "../toolsConfig";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { redirect } from "next/navigation";
import { z } from "zod";
import { updateTokens } from "@/actions/user";
import { revalidatePath } from "next/cache";

const textContent = z.object({
  type: z.literal("text"),
  text: z.string(),
});

const paragraphContent = z.object({
  type: z.literal("paragraph"),
  content: z.array(textContent),
});

const headingContent = z.object({
  type: z.literal("heading"),
  attrs: z.object({ level: z.number().min(1).max(3) }),
  content: z.array(textContent),
});

const listItemContent = z.object({
  type: z.literal("listItem"),
  content: z.array(paragraphContent),
});

const bulletListContent = z.object({
  type: z.literal("bulletList"),
  content: z.array(listItemContent),
});

const orderedListContent = z.object({
  type: z.literal("orderedList"),
  content: z.array(listItemContent),
});

const blockquoteContent = z.object({
  type: z.literal("blockquote"),
  content: z.array(paragraphContent),
});

const codeBlockContent = z.object({
  type: z.literal("codeBlock"),
  content: z.array(textContent),
});

const novelEditorSchema = z.object({
  type: z.literal("doc"),
  content: z.array(
    z.union([
      headingContent,
      paragraphContent,
      bulletListContent,
      orderedListContent,
      blockquoteContent,
      codeBlockContent,
    ])
  ),
});

export const createGeneration = async (formData: FormData) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: "User not found",
    };
  }
  const toolName = formData.get("toolName");
  console.log(formData);
  if (!toolName) {
    return {
      error: "Tool name is required",
    };
  }
  const systemMessage = prompts[toolName as keyof typeof prompts](formData);

  const response = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: novelEditorSchema,
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `Generate the ${toolName}` },
    ],
  });

  const { data, error } = await supabase
    .from("generations")
    .insert({
      content: JSON.stringify(response.object),
      type: toolName as string,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return {
      error: "Failed to create generation",
    };
  }

  await updateTokens();
  revalidatePath(`/generations/${data.id}`, "layout");

  return redirect(`/generations/${data.id}`);
};
