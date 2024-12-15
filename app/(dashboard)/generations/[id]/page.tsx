import NovelEditor from "../_components/novel-editor";
import { createClient } from "@/lib/supabase/server";

export default async function GenerationPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: generation } = await supabase
    .from("generations")
    .select("*")
    .eq("id", params.id)
    .single();
  if (!generation) return null;
  return <NovelEditor savedContent={generation.content} />;
}
