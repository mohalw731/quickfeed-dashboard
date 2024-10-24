import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../../ui/button";
import { CreditCard, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="w-full transition-all z-[999]">
      <div className="flex items-center justify-between py-5">
        <Link href="/" className="cursor-pointer">
          <h2 className="font-bold text-blue-500 flex items-center gap-2">
            <MessageSquare className="h-10 w-10" />
          </h2>
        </Link>

        <div className="flex items-center gap-3">
          <SignedOut>
            <Link href="/sign-in">
              <Button
                className="bg-transparent text-white hover:text-white hover:bg-[#303030] border-[1px] border-[#303030] rounded-full p-5 text-base"
                variant={"outline"}
              >
                Sign in
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href={"/payments"} className="cursor-pointer">
              <button className="p-1 bg-[#303030] rounded-full border-[1px] border-[#606060]">
                <CreditCard className="size-5 text-white" />
              </button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
