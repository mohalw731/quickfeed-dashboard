'use client'
import { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Define the type for the chart data
interface ChartData {
  label: string;
  count: number;
  fill: string;
}

// Dummy ratings data: ratings 1-5 categorized by colors
const calculateChartData = (ratingsArray: number[]): ChartData[] => {
  const data: ChartData[] = [
    { label: "Poor (1-2)", count: 0, fill: "#ff4d4d" }, // Red for poor ratings
    { label: "Average (3)", count: 0, fill: "#ffcc00" }, // Yellow for average
    { label: "Good (4-5)", count: 0, fill: "#4CAF50" }, // Green for good ratings
  ];

  // Categorize ratings into poor, average, and good
  ratingsArray.forEach(rating => {
    if (rating >= 1 && rating <= 2) {
      data[0].count += 1;
    } else if (rating === 3) {
      data[1].count += 1;
    } else if (rating >= 4 && rating <= 5) {
      data[2].count += 1;
    }
  });

  return data;
};

export default function OverallRating({ ratings }: { ratings: number[] }) {
  const [overallRating, setOverallRating] = useState(0);
  const [chartData, setChartData] = useState<ChartData[]>([]); // Set correct type for chartData
  const d = new Date();
  let months = d.getMonth();

  const calculateOverallRating = (ratingsArray: number[]) => {
    if (ratingsArray.length === 0) {
      return 0;
    }

    const total = ratingsArray.reduce((acc, current) => acc + current, 0);
    const average = total / ratingsArray.length;
    return Math.round(average * 2) / 2;
  };

  useEffect(() => {
    const rating = calculateOverallRating(ratings);
    setOverallRating(rating);
    setChartData(calculateChartData(ratings)); // Set chart data based on ratings
  }, [ratings]);

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Overall Rating</CardTitle>
        <CardDescription>Based on user feedback</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            visitors: { label: "Ratings" },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
         Average rating {overallRating}/5 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total feedback over the last {months} months
        </div>
      </CardFooter>
    </Card>
  );
}
