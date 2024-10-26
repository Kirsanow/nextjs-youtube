"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useState } from "react";
import { defaultExtensions } from "@/lib/editor/extensions";
const NovelEditor = ({
  savedContent,
}: {
  savedContent: string | undefined;
}) => {
  const [content, setContent] = useState<JSONContent | undefined>(
    savedContent ? JSON.parse(savedContent) : undefined
  );

  return (
    <EditorRoot>
      <EditorContent
        editorProps={{
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        extensions={defaultExtensions}
        initialContent={content}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
      />
    </EditorRoot>
  );
};
export default NovelEditor;
