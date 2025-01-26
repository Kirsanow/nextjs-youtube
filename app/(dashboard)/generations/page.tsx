import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export default async function GenerationsPage() {
  const supabase = await createClient();

  const { data: generations } = await supabase
    .from("generations")
    .select("*")
    .order("created_at", { ascending: false });

  if (!generations) return null;

  return (
    <div className="mx-auto flex flex-col w-full gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Your Generations
        </h1>
        <span className="text-muted-foreground">
          {generations.length} generations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generations.map((generation) => (
          <Link
            href={`/generations/${generation.id}`}
            key={generation.id}
            className="group transition-all duration-300 hover:scale-[1.02]"
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-xl hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">
                  {generation.title || "Untitled Generation"}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(generation.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {generation.content
                    ? JSON.parse(generation.content).content?.[0]?.content?.[0]
                        ?.text || "No content"
                    : "No content"}
                </p>
                <div className="mt-4 flex gap-2">
                  {generation.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {generations.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            No generations yet
          </h3>
          <p className="text-muted-foreground">
            Start creating your first generation to see it here
          </p>
        </div>
      )}
    </div>
  );
}
