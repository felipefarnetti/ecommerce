"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import CartCountUpdater from "@components/CartCountUpdater";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@hooks/useAuth";
import { toast } from "react-toastify";

interface Props {
  product: {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    rating?: number;
    sale: number;
    price: {
      base: number;
      discounted: number;
    };
  };
}

export default function BuyingOptions() {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const { product } = useParams();
  const productId = product[1];
  const { loggedIn } = useAuth();
  const router = useRouter();

  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  const addToCart = async () => {
    if (!productId) return;

    if (!loggedIn) return router.push("/auth/signin");

    const res = await fetch("/api/product/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });

    const { error } = await res.json();
    if (!res.ok && error) toast.error(error);

    router.refresh();
  };

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout/instant", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
    const { error, url } = await res.json();
    if (!res.ok) {
      toast.error(error);
    } else {
      // open the checkout url
      window.location.href = url;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <CartCountUpdater
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        value={quantity}
      />

      <Button
        onClick={() => {
          startTransition(async () => await addToCart());
        }}
        variant="text"
        disabled={isPending}
      >
        Add to Cart
      </Button>
      <Button
        disabled={isPending}
        ripple={false}
        fullWidth={true}
        onClick={() => {
          startTransition(async () => await handleCheckout());
        }}
        className="rounded-full"
        color="amber"
      >
        Buy Now
      </Button>
    </div>
  );
}
