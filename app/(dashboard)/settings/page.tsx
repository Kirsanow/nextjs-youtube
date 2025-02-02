import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createCustomerPortalSession, updateAvatar } from "./_actions";
import { UpgradeModal } from "./_components/upgrade-modal";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("user_data")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Your profile information and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={userData?.avatar || ""}
                alt="Avatar"
                className="h-20 w-20 rounded-full border border-slate-200"
              />
              <div>
                <form action={updateAvatar}>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </form>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <p className="text-sm text-slate-600">{user?.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Tokens Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tokens</CardTitle>
            <CardDescription>Your available tokens and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Available Tokens</p>
                <p className="text-2xl font-bold">{userData?.tokens || 0}</p>
              </div>
              <UpgradeModal />
              <form action={createCustomerPortalSession}>
                {/* <input type="hidden" name="userId" value={user?.id} /> */}
                <Button variant="outline" size="sm">
                  Manage Subscription
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
