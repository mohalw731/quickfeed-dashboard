"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { getStripe } from "@/lib/stripe-clinet";

type Props = {
  price: string
}

const SubscribeBtn = ({ price }: { price: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (price: string) => {
    setLoading(true);
    try {
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      }).then((res) => res.json());

      const stripe = await getStripe();
      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error(error);
      setError("Failed to redirect to checkout.");
    }
    setLoading(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Button onClick={() => handleCheckout(price)} className="bg-indigo-700" disabled={loading}>
      {loading ? <Loader2 className=" h-4 w-4 animate-spin" /> : `subscribe ` }
      {loading ? '' : <Lock className="h-4 w-4 ml-2" /> }
    </Button>
  );
};


export default SubscribeBtn;