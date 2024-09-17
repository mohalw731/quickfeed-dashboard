"use client";
import { useUser } from "@clerk/nextjs";
import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import { Plus } from "lucide-react";
import SubscribeBtn from "@/app/(user)/payments/subscribeButton";

type Props = {
  subscribed: boolean;
  projects: any;
};
export default function AddNewProjectHeader({ subscribed, projects }: Props) {
  const { user } = useUser();

  return (
    <div className="">
      <header className="flex items-center justify-between mt-5">
        <h1 className="md:text-3xl  text-2xl">
          Welcome, <span className="text-blue-500">{user?.firstName}</span>
        </h1>

        {projects.length === 1 && !subscribed ? (
          <SubscribeBtn price={"price_1PtLMzB35fil6MWOKpoSE4rd"} />
        ) : (
          <DialogTrigger asChild>
            <button className=" flex items-center gap-2 bg-blue-500 hover:bg-blue-600 hover:scale-105 md:py-2 p-3 md:px-5 md:rounded rounded-full text-white">
              <Plus className="size-4" />
              <span className="hidden md:block">Create</span>
            </button>
          </DialogTrigger>
        )}
      </header>
      <p
        className="text-slate-400 md:text-base text-sm
   mt-1"
      >
        Manage your widgets here
      </p>
    </div>
  );
}
