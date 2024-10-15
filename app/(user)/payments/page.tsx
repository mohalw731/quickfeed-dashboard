import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ManageSubscription from "./ManageSubscription";
import { getSubscription } from "@/actions/userSubscriptions";
import SubscribeBtn from "./subscribeButton";
import { monthlyPlanId } from "@/lib/payments";

// Update the type definition to include currentPeriodEnd
type Subscription = {
  userId: string | null;
  id: number;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscribed: boolean | null;
  currentPeriodEnd?: string; // Add this line
};

function SubscriptionBadge({ plan }: { plan: string }) {
  return (
    <Badge
      variant={plan === "premium" ? "default" : "secondary"}
      className="ml-2"
    >
      {plan === "premium" ? "Premium" : "Free"}
    </Badge>
  );
}

async function SubscriptionDetails() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <p className="text-muted-foreground">
        Please sign in to view subscription details.
      </p>
    );
  }

  const subscription = (await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  })) as Subscription | null;

  const subscribed = await getSubscription({ userId });

  const plan = subscription && subscription.subscribed ? "premium" : "free";

  return (
    <Card className="bg-[#202020] text-white border-[#303030] w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Subscription Details</CardTitle>
        <CardDescription className="text-slate-300">
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">
              Current Plan
              <SubscriptionBadge plan={plan} />
            </h2>
            <p className="text-sm text-slate-300">
              {plan === "premium"
                ? "You have access to all premium features."
                : "Upgrade to premium for full access to all features."}
            </p>
          </div>
          {subscription && subscription.currentPeriodEnd && (
            <div>
              <h2 className="text-lg font-semibold">Billing Cycle</h2>
              <p className="text-sm text-muted-foreground">
                Your next billing date is{" "}
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {subscribed ? (
          <ManageSubscription />
        ) : (
          <SubscribeBtn price={monthlyPlanId} />
        )}
      </CardFooter>
    </Card>
  );
}

export default function Page() {
  return (
    <div className=" mx-auto py-10 text-white flex items-center justify-center md:w-[800px] h-[calc(100dvh-200px)]">
      <Suspense fallback={<SubscriptionSkeleton />}>
        <SubscriptionDetails />
      </Suspense>
    </div>
  );
}

function SubscriptionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
