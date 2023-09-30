import { getCartItems } from "@lib/cartHelper";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export const POST = async (request: Request) => {
  try {
    const session = await auth();
    if (!session?.user)
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );
    const data = await request.json();
    const cartId = data.cartId as string;

    if (!isValidObjectId(cartId))
      return NextResponse.json({ error: "Invalid cart id!" }, { status: 401 });

    // fetching cart details

    const cartItems = await getCartItems(session.user.id, cartId);
    if (!cartItems)
      return NextResponse.json({ error: "Cart not found!" }, { status: 404 });

    const line_items = cartItems.products.map((product) => {
      return {
        price_data: {
          currency: "EUR",
          unit_amount: product.price * 100,
          product_data: {
            name: product.title,
            images: [product.thumbnail],
          },
        },
        quantity: product.qty,
      };
    });

    // we need to generate payment link and send to our frontend app
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: process.env.PAYMENT_SUCCESS_URL!,
      cancel_url: process.env.PAYMENT_CANCEL_URL!,
      shipping_address_collection: { allowed_countries: ["FR"] },
    };
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong, could not checkout!" },
      { status: 500 }
    );
  }
};
