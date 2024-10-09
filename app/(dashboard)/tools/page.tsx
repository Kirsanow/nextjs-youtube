import { Tool, toolsConfig } from "./toolsConfig";
import Link from "next/link";

export default function ToolsPage() {
  return (
    <div className="mx-auto flex flex-col w-full gap-8">
      <h1 className="text-2xl font-semibold tracking-tight text-black">
        Tools
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {toolsConfig.map((tool) => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </div>
    </div>
  );
}

const ToolCard = ({ title, description, icon, name }: Tool) => {
  return (
    <Link
      href={`/tools/${name}`}
      className="hover:shadow-sm rounded-xl border bg-white px-5 py-4 h-48 flex flex-col "
    >
      <div className="flex items-center gap-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-gradient-to-t from-gray-100 p-2.5">
          {icon}
        </div>
        <div>
          <div className="flex items-center">
            <p className="font-semibold text-slate-700">{title}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="line-clamp-3 text-sm text-slate-500">{description}</p>
      </div>
    </Link>
  );
};
