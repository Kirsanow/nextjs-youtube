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
const GenerationCreateModal = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
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
            <Input placeholder={placeholder} />
          </div>
        );
      case "number":
        return (
          <div key={key}>
            <Label>{label}</Label>
            <Input type="number" placeholder={placeholder} />
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
        <div className="flex flex-col gap-4">{renderFields()}</div>
        <DialogFooter>
          <Button>Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default GenerationCreateModal;
