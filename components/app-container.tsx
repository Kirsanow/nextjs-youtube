export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto pb-10 mt-10 w-full max-w-screen-xl px-2.5 lg:px-20 flex flex-col gap-y-3">
      {children}
    </div>
  );
}
