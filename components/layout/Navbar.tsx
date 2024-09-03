import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
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

        <div className="">
          <SignedOut>
            <Link href="/sign-in">
              <Button className=" bg-slate-100 hover:scale-105 hover:bg-white text-black border-2 border-slate-300">
                Sign in
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
