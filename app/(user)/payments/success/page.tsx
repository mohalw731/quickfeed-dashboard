"use client";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import Lottie from "lottie-react";
import Link from "next/link";
import React from "react";
import check from "../../../../assets/check.json";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100dvh-200px)]">
      <div className="border shadow-xl rounded-md px-5 py-10 items-center flex flex-col max-w-sm w-full">
        <span className="text-base font-semibold text-slate-800 mb-2">
          Quickfeed
        </span>
        <h1 className="text-2xl font-bold mb-4 text-slate-800">
          Payment Successful!
        </h1>
        <Lottie animationData={check} style={{ width: 200, height: 200 }} />{" "}
        {/* Render the animation */}
        <Link href="/dashboard">
          <Button className="bg-blue-500 hover:bg-blue-600 hover:scale-105">
            Start collecting feedbacks
          </Button>
        </Link>
      </div>
    </div>
  );
}
