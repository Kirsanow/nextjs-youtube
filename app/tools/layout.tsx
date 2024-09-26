export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Tools</h1>
      </div>
      <div>{children}</div>
    </div>
  );
}
