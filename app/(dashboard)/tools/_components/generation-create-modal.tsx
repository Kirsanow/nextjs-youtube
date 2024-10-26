"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toolsConfig } from "../toolsConfig";
import { z } from "zod";
import { useActionState } from "react";
import { createGeneration } from "../_actions";
const GenerationCreateModal = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  type ActionState = {
    error: string;
    success: string;
  };
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    async (prevState, formData) => {
      await createGeneration(formData);
      return {
        error: "",
        success: "Generation created successfully",
      };
    },
    {
      error: "",
      success: "",
    }
  );
  const tool = toolsConfig.find((tool) => tool.name === name);
  if (!tool) {
    return null;
  }
  const renderField = (key: string, field: z.ZodTypeAny) => {
    const descritpion = JSON.parse(field.description || "{}");
    const { label, placeholder, type } = descritpion;
    switch (type) {
      case "text":
        return (
          <div key={key}>
            <Label>{label}</Label>
            <Input placeholder={placeholder} name={key} />
          </div>
        );
      case "number":
        return (
          <div key={key}>
            <Label>{label}</Label>
            <Input type="number" placeholder={placeholder} name={key} />
          </div>
        );
    }
  };
  const renderFields = () => {
    if (tool.schema instanceof z.ZodObject) {
      return Object.entries(tool.schema.shape).map(([key, field]) =>
        renderField(key, field as z.ZodTypeAny)
      );
    } else {
      console.error("Tool schema is not a ZodObject");
      return null;
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Generation</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="flex flex-col gap-4">{renderFields()}</div>
          <DialogFooter>
            <Button disabled={pending} type="submit">
              {pending ? "Generating..." : "Generate"}
            </Button>
            {state.error && <p className="text-red-500">{state.error}</p>}
          </DialogFooter>
          <input type="hidden" name="toolName" value={name} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default GenerationCreateModal;
