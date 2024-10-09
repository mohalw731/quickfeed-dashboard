"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
export const description = "A mixed bar chart";

const chartConfig = {
  feedbacks: {
    label: "feedbacks",
  },
  good: {
    label: "Good",
    color: "green",
  },
  okey: {
    label: "Okey",
    color: "yellow",
  },
  bad: {
    label: "Bad",
    color: "red",
  },
  Total: {
    label: "Total",
    color: "light-gray",
  },
} satisfies ChartConfig;
export function Chart({ project }: { project: any }) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let name = month[d.getMonth()];
  let months = d.getMonth();
  const feedback = project.map((item: any) => item.rating);
  const good = feedback.filter((item: any) => item === 5 || item === 4).length;
  const okey = feedback.filter((item: any) => item === 3).length;
  const bad = feedback.filter((item: any) => item === 1 || item === 2).length;
  const total = project.length;

  const chartData = [
    {
      browser: "good",
      feedbacks: good,
      fill: "rgb(34 197 94 / var(--tw-bg-opacity))",
    },
    {
      browser: "okey",
      feedbacks: okey,
      fill: "rgb(234 179 8 / var(--tw-bg-opacity))",
    },
    {
      browser: "bad",
      feedbacks: bad,
      fill: "rgb(239 68 68 / var(--tw-bg-opacity))",
    },
    {
      browser: "Total",
      feedbacks: total,
      fill: "rgb(226 232 240)",
    },
  ];
  const [overallRating, setOverallRating] = useState(0);


  const calculateOverallRating = (ratingsArray: number[]) => {
    if (ratingsArray.length === 0) {
      return 0;
    }

    const total = ratingsArray.reduce((acc, current) => acc + current, 0);
    const average = total / ratingsArray.length;
    return Math.round(average * 2) / 2;
  };

  useEffect(() => {
    const rating = calculateOverallRating(feedback);
    setOverallRating(rating);
  }, [feedback]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Feedback overview</CardTitle>
        <CardDescription>January - {name} {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="feedbacks" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="feedbacks" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Your feedbacks in the last {months} months
        </div>
        <div className="leading-none text-muted-foreground">
          Overall rating : {overallRating} / 5
        </div>
      </CardFooter>
    </Card>
  );
}
