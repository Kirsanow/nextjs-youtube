"use server";
import { prompts, toolsConfig } from "../toolsConfig";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

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

  cookies().set("editorContent", JSON.stringify(response.object), {
    maxAge: 3600, // 1 hour
    path: "/",
  });

  return redirect(
    `/generations/${Math.random().toString(36).substring(2, 15)}`
  );
};
