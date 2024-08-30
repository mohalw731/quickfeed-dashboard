import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import AvatarCircles from "../magicui/avatar-circles";
import { SignedOut } from "@clerk/nextjs";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

export default function Hero() {
  return (
    <>
      <div className="bg-blue-500 size-48 md:size-64 blur-[120px] rotate-[-45deg] absolute top-[0%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:top-8 md:left-28 md:translate-x-0 md:translate-y-0 -z-10" />

      <div className="bg-blue-500 size-64 blur-[180px] right-28 bottom-44 rotate-[-45deg]   absolute md:block hidden" />

      <main className="flex flex-col items-center gap-4 h-[calc(100vh-180px)] justify-center z-[999]">
        <div className=" flex flex-col items-center gap-2 ">
          <div className=" z-10 flex -space-x-4 rtl:space-x-reverse ">
            <AvatarCircles numPeople={11} avatarUrls={avatarUrls} />
          </div>
          <p>
            <span className="font-bold md:text-base text-sm">11</span> founders
            collect more feedback
          </p>
        </div>

        <div className="flex items-center flex-col md:gap-4 gap-2">
          <h1 className="md:text-6xl text-2xl text-center sm:text-2xl">
            <span className="text-blue-500">AI powered feedback</span> <br />
            collection built into your app
          </h1>
          <p className="text-slate-500 md:text-base text-sm text-center max-w-[550px]">
            QucikFeed uses machine learning algorithms to analyze customer
            feedback and provide actionable insights.
          </p>
        </div>

        <div className="flex gap-4 md:mt-5">
         <SignedOut>
         <Button className="bg-blue-500 hover:bg-blue-600 hover:scale-105">
            Get Started
          </Button>
         </SignedOut>
         <a href="#pricing">
         <Button className=" bg-slate-100 hover:scale-105 hover:bg-white text-black border-2 border-slate-300">
            Pricing
          </Button>
         </a>
        </div>
      </main>
    </>
  );
}
