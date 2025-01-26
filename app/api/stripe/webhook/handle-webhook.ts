import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function handleWebhook({
  signature,
  payload,
}: {
  signature: string;
  payload: string;
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
    typescript: true,
  });

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const supabase = await createClient();

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;

        // Update user's subscription status
        const { error } = await supabase
          .from("user_data")
          .update({
            subscription_id: subscription.id,
            status: subscription.status,
            price_id: subscription.items.data[0].price.id,
            current_period_end: new Date(
              subscription.current_period_end * 1000
            ),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq("id", userId);

        if (error) {
          console.error("Error updating user subscription:", error);
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;

        // Remove user's subscription
        const { error } = await supabase
          .from("user_data")
          .update({
            subscription_id: null,
            status: "canceled",
            price_id: null,
            current_period_end: null,
            cancel_at_period_end: null,
          })
          .eq("id", userId);

        if (error) {
          console.error("Error updating user subscription:", error);
        }

        break;
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Error handling webhook:", err);
    throw err;
  }
}
