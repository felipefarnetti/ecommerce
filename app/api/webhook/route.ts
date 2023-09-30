import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY!;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const stripe = new Stripe(stripeSecret, {
  apiVersion: "2023-08-16",
});

export const POST = async (req: Request) => {
  const data = await req.text();

  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = await stripe.webhooks.constructEvent(
      data,
      signature,
      webhookSecret
    );
  } catch (error) {
    // console.log(error);

    return NextResponse.json(
      { error: (error as any).message },
      { status: 400 }
    );
  }

  //   console.log(event.type);

  if (event.type === "checkout.session.completed") {
    // create a new order
    // recount our stock
  }
  return NextResponse.json({});
};
