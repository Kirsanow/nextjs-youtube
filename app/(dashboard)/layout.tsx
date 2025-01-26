import AppContainer from "@/components/app-container";
import AppHeader from "@/components/app-header";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: userData, error: userDataError } = await supabase
    .from("user_data")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div>
      <AppHeader userData={userData} />
      <AppContainer>{children}</AppContainer>
    </div>
  );
}
