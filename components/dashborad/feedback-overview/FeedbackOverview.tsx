"use client"

import React, { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, Minus, ThumbsDown } from "lucide-react"

type Rating = 1 | 2 | 3 | 4 | 5
type FeedbackItem = { rating: Rating }

interface FeedbackOverviewProps {
  project: FeedbackItem[]
}

interface FeedbackCategoryProps {
  icon: React.ReactNode
  label: string
  count: number
  total: number
  color: string
}

const RATING_CATEGORIES = {
  GOOD: { ratings: [4, 5] as Rating[], label: "Good", icon: <ThumbsUp className="w-4 h-4 text-green-500" />, color: "bg-green-500" },
  OKAY: { ratings: [3] as Rating[], label: "Okay", icon: <Minus className="w-4 h-4 text-yellow-500" />, color: "bg-yellow-500" },
  BAD: { ratings: [1, 2] as Rating[], label: "Bad", icon: <ThumbsDown className="w-4 h-4 text-red-500" />, color: "bg-red-500" },
} as const

const FeedbackCategory: React.FC<FeedbackCategoryProps> = ({ icon, label, count, total, color }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm ">{count}</span>
      </div>
      <div className="h-2 w-full bg-gray-400  dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

export default function FeedbackOverview({ project }: FeedbackOverviewProps) {
  const { feedbackCounts, overallRating, totalFeedback } = useMemo(() => {
    const initialCounts = { good: 0, okay: 0, bad: 0 }
    const totalRating = project.reduce(
      (acc, { rating }) => {
        if (RATING_CATEGORIES.GOOD.ratings.includes(rating)) acc.counts.good++
        else if (RATING_CATEGORIES.OKAY.ratings.includes(rating)) acc.counts.okay++
        else if (RATING_CATEGORIES.BAD.ratings.includes(rating)) acc.counts.bad++
        acc.totalRating += rating
        return acc
      },
      { counts: initialCounts, totalRating: 0 }
    )

    const averageRating = project.length > 0 ? Math.round((totalRating.totalRating / project.length) * 2) / 2 : 0

    return {
      feedbackCounts: totalRating.counts,
      overallRating: averageRating,
      totalFeedback: project.length,
    }
  }, [project])

  const categories = [
    { ...RATING_CATEGORIES.GOOD, count: feedbackCounts.good },
    { ...RATING_CATEGORIES.OKAY, count: feedbackCounts.okay },
    { ...RATING_CATEGORIES.BAD, count: feedbackCounts.bad },
  ]

  return (
    <Card className="w-full md:w-[400px] h-[208px] overflow-hidden bg-[#DEE2E6] dark:bg-[#0F0F11] border-none">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Feedback Overview 🔍</h1>
          <div className="bg-[#CED4DA] dark:bg-[#171717] rounded-full px-3 py-1 text-sm font-medium">
            {overallRating.toFixed(1)} / 5
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-between">
          {categories.map(({ label, icon, count, color }) => (
            <FeedbackCategory
              key={label}
              icon={icon}
              label={label}
              count={count}
              total={totalFeedback}
              color={color}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
