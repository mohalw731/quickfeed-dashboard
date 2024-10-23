'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

interface Feedback {
  id: number;
  message: string | null; 
  rating: number | null;
};

type FilterType = 'all' | 'bad' | 'okay' | 'good';

interface FilterButton {
  type: FilterType
  label: string
  className: string
};

const filterButtons: FilterButton[] = [
  { type: 'all', label: 'All', className: 'bg-blue-500 hover:bg-blue-600' },
  { type: 'good', label: 'Good', className: 'bg-[#303030] hover:bg-[#303030]' },
  { type: 'okay', label: 'Okay', className: 'bg-[#303030] hover:bg-[#303030]' },
  { type: 'bad', label: 'Bad', className: 'bg-[#303030] hover:bg-[#303030]' },
];

export default function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (filter === 'all') return true
    if (filter === 'bad' && (feedback.rating === 1 || feedback.rating === 2)) return true
    if (filter === 'okay' && feedback.rating === 3) return true
    if (filter === 'good' && (feedback.rating === 4 || feedback.rating === 5)) return true
    return false
  });

  return (
    <div
      className={`bg-[#202020] p-5 rounded-[20px] text-white md:h-full custom-scrollbar md:max-w-[600px] h-[500px] overflow-auto md:min-w-[600px]`}
    >
      <h1 className="text-2xl mb-5 text-white">
        Feedbacks <span className="wave">👋</span>
      </h1>
      <div className="flex gap-2 mb-5">
        {filterButtons.map((button) => (
          <Button
            key={button.type}
            className={`${button.className} rounded-lg ${filter === button.type && "border border-[#404040]"} focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-[#404040]`}
            onClick={() => setFilter(button.type)}
          >
            {button.label}
          </Button>
        ))}
      </div>
      <div>
        {filteredFeedbacks.length === 0 && (
          <div className="flex justify-center items-center h-[calc(100dvh-202px)]">
            <p className="text-slate-200 text-center text-2xl">
              No feedback yet 👀
            </p>
          </div>
        )}
        <ul className="flex flex-col gap-2 w-full">
          {filteredFeedbacks.map((feedback: Feedback) => (
            <li
              key={feedback.id}
              className="flex gap-2 bg-[#303030] rounded-[10px] p-5 justify-between flex-wrap"
            >
              <h2 className="flex flex-col gap-2">{feedback.message}</h2>
              <span
                className={
                  feedback.rating === 1 || feedback.rating === 2
                    ? "bg-red-800 text-black py-1 px-3 rounded-full text-xs"
                    : feedback.rating === 3
                      ? "bg-yellow-400 text-black py-1 px-3 rounded-full text-xs"
                      : feedback.rating === 4 || feedback.rating === 5
                        ? "bg-green-500 text-black py-1 px-3 rounded-full text-xs"
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
  )
}