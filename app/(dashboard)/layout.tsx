import AppContainer from "@/components/app-container";
import AppHeader from "@/components/app-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppHeader />
      <AppContainer>{children}</AppContainer>
    </div>
  );
}
