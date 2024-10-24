import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <>
      <div className="bg-blue-500 size-48 md:size-64 blur-[150px] rotate-[-45deg] absolute top-[20%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 " />

      <div className="bg-blue-500 size-64 blur-[150px] right-28 bottom-44 rotate-[-45deg]   absolute md:block hidden" />

      <main className="flex flex-col items-center gap-4 h-[calc(100vh-180px)] justify-center z-[999]">
        <div className="flex items-center flex-col md:gap-4 gap-2">
          <h1 className="md:text-7xl text-neutral-300 text-2xl text-center sm:text-2xl">

            <span className="text-blue-500">AI powered feedback</span> <br />
            collection built into your app
          </h1>
          <p className="text-slate-300 md:text-base text-sm text-center max-w-[550px]">
            Quickfeed uses machine learning algorithms to analyze customer
            feedback and provide actionable insights.
          </p>
        </div>

        <div className="flex gap-4 md:mt-5">
          <Link href={"/sign-up"}>

            <Button variant={"outline"} className="bg-blue-500 border-[#3333] hover:bg-blue-600 rounded-full  text-white hover:text-white">
              Get Started
            </Button>
          </Link>
          <a href="#pricing">
            <Button variant={"outline"} className="rounded-full bg-transparent border-[#303030] text-white hover:opacity-90 hover:text-white hover:bg-[#303030]">
              Pricing
            </Button>
          </a>
        </div>
      </main>
    </>
  );
}
