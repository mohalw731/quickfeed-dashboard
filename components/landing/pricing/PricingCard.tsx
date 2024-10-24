"use client";

import { PricingPlan } from "@/sections/Pricing";
import { Check, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PricingCard({
  title,
  price,
  description,
  features,
  isPopular,
  url,
}: PricingPlan) {
  const router = useRouter();

  const onClick = () => {
    router.push(url);
  };

  const isYearly = title.toLowerCase().includes("yearly");

  return (
    <div
      className={`
      relative flex flex-col justify-between h-full rounded-xl
      shadow-md transition-all duration-300 hover:shadow-xl 
      ${isPopular ? "border border-neutral-300" : "border border-neutral-800 hover:border-neutral-500"}
    `}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
          <Star fill="yellow" className="w-4 h-4" /> Most Popular
        </div>
      )}
      <div className="space-y-6 p-6 pt-8">
        <div>
          <h3 className="font-bold text-2xl text-neutral-300">{title}</h3>
          <p className="text-sm text-slate-500 mt-2">{description}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-4xl font-extrabold text-neutral-300">
              ${price.toFixed(2)}
            </span>
            <span className="ml-1 text-sm text-neutral-300">
              {isYearly ? "/year" : price !== 0 ? "/month" : ""}
            </span>
            {isYearly && (
              <div className="text-xs text-green-500 ml-auto mt-1">
                17% discount
              </div>
            )}
          </div>
        </div>
        <ul className="space-y-3">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-500">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0">
        <Button
          onClick={onClick}
          className={`w-full ${isPopular ? "bg-neutral-300 hover:bg-neutral-400 text-black" : ""}`}
        >
          <span className="">Get Started</span>
        </Button>
      </div>
    </div>
  );
}
