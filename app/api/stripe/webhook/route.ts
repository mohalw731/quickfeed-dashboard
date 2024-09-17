import { NextResponse } from 'next/server';
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createSubscription, cancelSubscription } from "@/actions/userSubscriptions";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webHookSecret) {
    return NextResponse.json("Webhook secret not set", { status: 400 });
  }

  if (!sig) {
    return NextResponse.json("No signature", { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webHookSecret);
    const data = event.data.object as Stripe.Subscription;

    if (relevantEvents.has(event.type)) {
      if (event.type === "customer.subscription.created") {
        const { customer } = data;
        await createSubscription({ stripeCustomerId: customer as string });
      } else if (event.type === "customer.subscription.deleted") {
        const { customer } = data;
        await cancelSubscription({ stripeCustomerId: customer as string });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
