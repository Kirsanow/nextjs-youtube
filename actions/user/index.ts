"use server";

import { createClient } from "@/lib/supabase/server";

export async function createUserData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data: userData, error: userDataError } = await supabase
    .from("user_data")
    .select("*")
    .eq("id", user.id)
    .single();

  if (userDataError) {
    console.error(userDataError);
  }

  if (userData) {
    return;
  }

  const { error } = await supabase.from("user_data").insert({
    id: user.id,
    avatar: `https://api.dicebear.com/9.x/micah/svg?seed=${user?.email}`,
  });

  if (error) {
    console.error(error);
  }
}

export async function updateTokens() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data: userData, error: userDataError } = await supabase
    .from("user_data")
    .select("*")
    .eq("id", user.id)
    .single();

  if (userDataError) {
    console.error(userDataError);
  }

  if (!userData) {
    return;
  }

  const { error } = await supabase
    .from("user_data")
    .update({ tokens: userData?.tokens - 1 })
    .eq("id", user.id);

  if (error) {
    console.error(error);
  }
}
