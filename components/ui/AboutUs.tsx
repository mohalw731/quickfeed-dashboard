"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const words = ["Quick", "Easy", "Secure"];
  const [activeWord, setActiveWord] = useState(words[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [words]);

  return (
    <div className=" flex flex-col py-24 border-y border-none items-center justify-center">
      <div className="flex flex-col items-center max-h-full text-center">
        <h1 className=" text-5xl md:text-6xl text-blue-500">
          Quick<span className="text-neutral-300">Feed</span>
        </h1>
        <h2 className="text-neutral-300 text-2xl mt-4">Analytics made easy!</h2>
        <p className="text-neutral-400 mt-6 max-w-xl tracking-wide">
          Transform raw data into actionable insights at the touch of a button.
          Our cutting-edge analysis tool dives deep into the feedback you`ve
          received, providing you with a comprehensive understanding of your
          performance and clear pathways for improvement.
        </p>
      </div>
      <Link href={"/sign-up"}>
        <Button className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full hover:scale-105 font-medium flex items-center transition-all hover:bg-blue-600">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
      <div className="w-full overflow-hidden h-[150px] pt-12 max-w-2xl">
        <div className=" z-0 flex justify-between">
          {words.map((word, index) => (
            <p
              key={word}
              className={`font-bold transition-all duration-700 ease-in-out ${activeWord === word ? "text-blue-500 md:text-6xl text-4xl" : "text-neutral-800 md:text-5xl text-3xl"}`}
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                transform: `translateY(${index % 2 === 0 ? "-20px" : "20px"})`,
              }}
            >
              {word}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
