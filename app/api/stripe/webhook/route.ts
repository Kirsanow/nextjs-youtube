import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import { handleWebhook } from "./handle-webhook";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new NextResponse("No signature", { status: 400 });
  }

  try {
    const payload = await req.text();
    const result = await handleWebhook({
      signature,
      payload,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error handling webhook:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}
