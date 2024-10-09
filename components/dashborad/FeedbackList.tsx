import { getSubscription } from "@/actions/userSubscriptions";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import SubscribeBtn from "@/app/(user)/payments/subscribeButton";
import { monthlyPlanId } from "@/lib/payments";
import { LucideWand2 } from "lucide-react";
import ServerComponent from "@/app/(user)/projects/[formId]/analyze/serverAnalyze";

export default async function FeedbackList({
  feedbacks,
  projectId,
}: {
  feedbacks: any;
  projectId: number;
}) {
  const { userId } = auth();
  const subscribed = await getSubscription({ userId: userId as string });

  return (
    <div className="max-w-2xl w-full ">
      <h1 className="text-2xl font-bold flex justify-between items-center">
        Feedbacks
        
        {subscribed ? (
          <Link href={`/projects/${projectId}/analyze`}>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600  ">
              AI Analyze
            </Button>
          </Link>
        ) : (
          <SubscribeBtn price={monthlyPlanId} />
        )}
      </h1>

      <div className="h-[calc(100dvh-162px)] overflow-y-auto mt-4  p-4 rounded-lg shadow-sm border bg-white custom-scrollbar">
        {feedbacks.length === 0 && (
          <div className="flex justify-center items-center  h-[calc(100dvh-202px)]">
            <p className="text-slate-500 text-center text-lg">
              No feedback yet
            </p>
          </div>
        )}
        <ul className="flex flex-col gap-2">
          {feedbacks.map((feedback: any) => (
            <li
              key={feedback.id}
              className="border-b py-4 px-2 flex md:items-end justify-between md:flex-row flex-col items-start gap-2"
            >
              <h2 className="flex flex-col gap-2">{feedback.message}</h2>
              <span
                className={
                  feedback.rating === 1 || feedback.rating === 2
                    ? "bg-red-500 text-white py-1 px-3 rounded-full text-xs"
                    : feedback.rating === 3
                    ? "bg-yellow-500 text-white py-1 px-3 rounded-full text-xs"
                    : feedback.rating === 4 || feedback.rating === 5
                    ? "bg-green-500 text-white py-1 px-3 rounded-full text-xs"
                    : ""
                }
              >
                Rating: {feedback.rating}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
