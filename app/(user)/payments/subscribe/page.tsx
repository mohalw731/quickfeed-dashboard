import { monthlyPlanId, yearlyPlanId } from "@/lib/payments"
import SubscribeBtn from "../subscribeButton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

const features = [
"Unlimited projects",
      "Unlimited feedbacks",
      "AI-analytcs & overview",
      "Priority support",
]

const PlanFeature = ({ feature }: { feature: string }) => (
  <div className="flex items-center space-x-2">
    <CheckCircle2 className="h-5 w-5 text-green-500" />
    <span>{feature}</span>
  </div>
)

const Page = ({ searchParams }: {
  searchParams: {
    plan: string
  }
}) => {
  const { plan } = searchParams
  const planId = plan === "monthly" ? monthlyPlanId : yearlyPlanId
  const isMonthly = plan === "monthly"

  return (
    <div className="flex items-center justify-center w-full h-[calc(100dvh-100px)] flex-col">
      {/* <h1 className="md:text-4xl text-2xl font-bold mb-6 text-center text-white">Choose Your Subscription Plan</h1> */}
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {isMonthly ? "Monthly" : "Yearly"} Plan
            <Badge variant="secondary" className="ml-2">
              {isMonthly ? "Best for flexibility" : "Best value"}
            </Badge>
          </CardTitle>
          <CardDescription>
            {isMonthly
              ? "Enjoy our premium features with a flexible monthly subscription"
              : "Get our best deal with an annual subscription"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-3xl font-bold">
              ${isMonthly ? "19.99" : "199.99"}
              <span className="text-lg font-normal text-muted-foreground">
                /{isMonthly ? "month" : "year"}
              </span>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <PlanFeature key={index} feature={feature} />
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <SubscribeBtn price={planId} />
          <p className="text-sm text-muted-foreground">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-200">
          Want to switch plans?
          <a href={`?plan=${isMonthly ? "yearly" : "monthly"}`} className="text-blue-500 hover:underline">
            {" "}
            View {isMonthly ? "yearly" : "monthly"} plan
          </a>
        </p>
      </div>
    </div>
  )
}

export default Page