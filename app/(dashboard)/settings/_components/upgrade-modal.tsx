import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { createCheckoutSession } from "../_actions";

const plans = [
  {
    name: "Pro",
    price: "$19",
    interval: "month",
    description: "Perfect for individual creators",
    features: [
      "100 tokens per month",
      "Priority support",
      "Advanced generation options",
      "Early access to new features",
    ],
    priceId: "price_1QlbXKK0zjTdGAozf8sqYLMA", // You'll need to replace this with your actual Stripe price ID
  },
  {
    name: "Business",
    price: "$49",
    interval: "month",
    description: "For teams and businesses",
    features: [
      "300 tokens per month",
      "24/7 priority support",
      "Custom generation options",
      "API access",
      "Team collaboration tools",
    ],
    priceId: "price_1QlbXgK0zjTdGAozIEG7zNuy", // You'll need to replace this with your actual Stripe price ID
  },
];

export function UpgradeModal({ children }: { children?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? children : <Button>Get More Tokens</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>
            Choose a plan that best fits your needs
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 pt-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold leading-none tracking-tight">
                  {plan.name}
                </h3>
                <div className="flex items-baseline text-slate-900">
                  <span className="text-3xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground ml-1">
                    /{plan.interval}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
              <form
                action={async () => {
                  "use server";
                  await createCheckoutSession({
                    priceId: plan.priceId,
                  });
                }}
                className="mt-6"
              >
                <Button className="w-full" size="lg">
                  Subscribe to {plan.name}
                </Button>
              </form>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
