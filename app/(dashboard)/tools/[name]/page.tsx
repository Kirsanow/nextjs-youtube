import Link from "next/link";
import { toolsConfig } from "../toolsConfig";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import GenerationCreateModal from "../_components/generation-create-modal";

export default function ToolInnerPage({
  params,
}: {
  params: { name: string };
}) {
  const tool = toolsConfig.find((tool) => tool.name === params.name);
  if (!tool) {
    return <div>Tool not found</div>;
  }
  return (
    <div className="grid gap-5 pb-10 lg:col-span-4">
      <div className="mx-auto grid w-full max-w-screen-lg gap-8 px-2.5 lg:px-20">
        <Link href="/tools" className="flex items-center gap-x-1">
          <ChevronLeftIcon className="size-4 text-slate-500" />
          <p className="text-sm font-medium text-slate-500">Tools</p>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-x-3">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md border border-slate-200 bg-gradient-to-t from-slate-100 p-2">
              {tool?.icon}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-slate-700">
                  {tool?.name.slice(0, 1).toUpperCase() + tool?.name.slice(1)}
                </p>
              </div>
              <p className="text-sm text-slate-500">{tool?.description}</p>
            </div>
          </div>
          <GenerationCreateModal name={tool.name}>
            <Button className="h-10">Generate</Button>
          </GenerationCreateModal>
        </div>

        <div className="w-full rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center gap-x-2 border-b border-slate-200 px-6 py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open-text size-4"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              <path d="M6 8h2"></path>
              <path d="M6 12h2"></path>
              <path d="M16 8h2"></path>
              <path d="M16 12h2"></path>
            </svg>
            <p className="text-sm font-medium text-slate-700">Overview</p>
          </div>

          <div className="prose prose-sm prose-slate max-w-none p-6 transition-all prose-headings:leading-tight prose-a:font-medium prose-a:text-slate-500 prose-a:underline-offset-4 hover:prose-a:text-black">
            <h1>{tool.overview.title}</h1>
            <p>{tool.overview.description}</p>
            <h2>Features</h2>
            <ul>
              {tool.overview.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
