"use client";
import { PricingPlan } from "@/sections/Pricing";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const PricingCard = ({ title, price, description, features, isPopular, url }: PricingPlan) => {
  const router = useRouter();

  const onClick = () => {
    router.push(url);
  }

  return (
    <div className="border flex flex-col justify-between bg-white/20 rounded-lg h-full p-6 hover:shadow-md text-left relative">
      {
        isPopular && (
          <div className="absolute top-0 right-0 bg-blue-700 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg">
            Popular
          </div>
        )
      }
      <div>
        <div className="inline-flex items-end">
          <h1 className=" text-3xl">${price}</h1>
        </div>
        <h2 className="font-semibold text-xl my-2 ">
          {title}
        </h2>
        <p>{description}</p>
        <div className="flex-grow border-t border-gray-400 opacity-25 my-3"/>
        <ul>
          {
            features.map((feature: string, index: number) => (
              <li key={index} className="flex flex-row items-center text-gray-700 gap-2 my-2">
                <div className="rounded-full flex items-center justify-center">
                  <Check className="text-green-500 size-4"  />
                </div>
                <p>{feature}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-600  py-2 mt-3 rounded-lg text-white w-full">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default PricingCard;