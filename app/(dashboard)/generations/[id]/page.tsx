import { cookies } from "next/headers";
import NovelEditor from "../_components/novel-editor";

export default async function GenerationPage({
  params,
}: {
  params: { id: string };
}) {
  const savedContent = cookies().get("editorContent")?.value;
  if (!savedContent) return null;
  return <NovelEditor savedContent={savedContent} />;
}
