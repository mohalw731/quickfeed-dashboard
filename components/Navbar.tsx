import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";


export default function PageHeader() {
  return (
    <header className="sticky top-0 inset-x-0 w-full transition-all">
      <div className="flex p-5 max-w-7xl w-full mx-auto items-center justify-between">
        <h2>QuickFeed</h2>

        <div className="">
          <SignedOut>
            <Button className="rounded-full">
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
