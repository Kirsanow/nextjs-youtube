"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function updateAvatar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const randomSeed = Math.random().toString(36).substring(2, 15);

  const { error: userDataError } = await supabase
    .from("user_data")
    .update({
      avatar: `https://api.dicebear.com/9.x/micah/svg?seed=${randomSeed}`,
    })
    .eq("id", user?.id);

  if (userDataError) {
    console.error(userDataError);
  }

  revalidatePath("/settings");
  revalidatePath("/settings", "layout");
  redirect("/settings");
}

export async function createCheckoutSession({ priceId }: { priceId: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Create Stripe checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: user.email!,
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?canceled=true`,
    subscription_data: {
      metadata: {
        userId: user.id,
      },
    },
  });

  if (!checkoutSession.url) {
    return {
      error: "Failed to create checkout session",
    };
  }

  return redirect(checkoutSession.url);
}

export async function createCustomerPortalSession() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("user_data")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!user) {
    return redirect("/login");
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: userData?.customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
  });

  if (!portalSession.url) {
    return {
      error: "Failed to create customer portal session",
    };
  }

  return redirect(portalSession.url);
}
