import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import {MessageSquare } from "lucide-react";
import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="sticky top-0 inset-x-0 w-full transition-all z-[999]">
      <div className="flex items-center justify-between py-5">
        <Link href="/" className="cursor-pointer"><h2 className="font-bold text-orange-500 flex items-center gap-2"><MessageSquare className="h-10 w-10"/></h2></Link>
        <div className="">
          <SignedOut>
            <Button className="border bg-slate-100 hover:scale-105" variant="outline">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
