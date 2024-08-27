import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import AvatarCircles from "./magicui/avatar-circles";

const avatarUrls = [
    "https://avatars.githubusercontent.com/u/16860528",
    "https://avatars.githubusercontent.com/u/20110627",
    "https://avatars.githubusercontent.com/u/106103625",
    "https://avatars.githubusercontent.com/u/59228569",
  ];

export default function Hero() {
  return (
    <>
      <div className="bg-orange-500 size-64 blur-[200px] top-8 rotate-[-45deg]   absolute" />
      <div className="bg-orange-500 size-64 blur-[200px] right-28 bottom-44 rotate-[-45deg]   absolute md:visible hidden" />

      <main className="flex flex-col items-center gap-4 my-12 ">
        <div className=" flex flex-col items-center gap-2 ">
          <div className=" z-10 flex -space-x-4 rtl:space-x-reverse ">
     <AvatarCircles numPeople={11} avatarUrls={avatarUrls} />

          </div>
          <p>
            <span className="font-bold md:text-base text-sm">11</span> founders collect more feedback
          </p>
        </div>

        <div className="flex items-center flex-col gap-4">
          <h1 className="md:text-6xl text-3xl text-center">
            <span className="text-orange-500">AI powered feedback</span> <br />
            collection built into your app
          </h1>
          <p className="text-slate-500 md:text-base text-sm text-center max-w-[550px]" >
            Feedstack uses machine learning algorithms to analyze
            customer feedback and provide actionable insights.
          </p>
        </div>

        <div className="flex gap-4 mt-5">
          <Button className="bg-orange-500 hover:bg-orange-600 hover:scale-105">
            Get Started
          </Button>
          <Button className="border text-black bg-transparent hover:bg-white hover:scale-105">
            Pricing
          </Button>
        </div>
      </main>
      
    </>
  );
}
