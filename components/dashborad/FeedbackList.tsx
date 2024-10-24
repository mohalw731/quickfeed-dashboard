"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, ChevronDown, ChevronUp, Clock, LucideIcon } from "lucide-react";

interface Feedback {
  id: number;
  message: string | null;
  rating: number | null;
  name: string | null;
  createdAt: Date | null;
};

type FilterType = "all" | "bad" | "okay" | "good";
type SortType = "newest" | "oldest" | "last7days" | "last30days";

interface FilterButton {
  type: FilterType;
  label: string;
  className: string;
};

const filterButtons: FilterButton[] = [
  { type: "all", label: "All", className: "bg-blue-500 hover:bg-blue-600" },
  { type: "good", label: "Good", className: "bg-[#303030] hover:bg-[#303030]" },
  { type: "okay", label: "Okay", className: "bg-[#303030] hover:bg-[#303030]" },
  { type: "bad", label: "Bad", className: "bg-[#303030] hover:bg-[#303030]" },
];

interface SelectSortProps {
  icon: LucideIcon;
  value: SortType;
  title: string;
};

const selectSort: SelectSortProps[] = [
  { icon: ChevronUp, value: "newest", title: "Newest" },
  { icon: ChevronDown, value: "oldest", title: "Oldest" },
  { icon: Clock, value: "last7days", title: "Last 7 days" },
  { icon: Clock, value: "last30days", title: "Last 30 days" },
];

const formatDate = (date: Date | null): string => {
  if (!date) return "No date available";
  return date.toISOString().split('T')[0];
};

export default function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");

  const filteredAndSortedFeedbacks = feedbacks
    .filter((feedback) => {
      if (filter === "all") return true
      if (filter === "bad" && (feedback.rating === 1 || feedback.rating === 2)) return true
      if (filter === "okay" && feedback.rating === 3) return true
      if (filter === "good" && (feedback.rating === 4 || feedback.rating === 5)) return true
      return false
    })
    .filter((feedback) => {
      if (!feedback.createdAt) return false;
      const now = new Date();
      const feedbackDate = new Date(feedback.createdAt);
      if (sort === "last7days") {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return feedbackDate >= sevenDaysAgo;
      };
      if (sort === "last30days") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return feedbackDate >= thirtyDaysAgo;
      };
      return true;
    })
    .sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0
      if (sort === "newest") return b.createdAt.getTime() - a.createdAt.getTime()
      if (sort === "oldest") return a.createdAt.getTime() - b.createdAt.getTime()
      return b.createdAt.getTime() - a.createdAt.getTime() 
    });

  return (
    <div
      className={`bg-[#202020] p-5 rounded-[20px] text-white md:h-full custom-scrollbar md:max-w-[600px] h-[500px] overflow-auto md:min-w-[600px]`}
    >
      <h1 className="text-2xl mb-5 text-white">
        Feedbacks <span className="wave">👋</span>
      </h1>
      
      <div className="flex justify-between items-start  mb-5 md:flex-row flex-col gap-2">
        <div className="flex gap-2">
          {filterButtons.map((button) => (
            <Button
              key={button.type}
              className={`${button.className} rounded-lg ${filter === button.type && "border border-[#404040]"
                } focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-[#404040]`}
              onClick={() => setFilter(button.type)}
            >
              {button.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Select value={sort} onValueChange={(value: SortType) => setSort(value)}>
            <SelectTrigger className="bg-transparent border-none text-white hover:text-white transition-colors ring-2 ring-[#404040] focus:ring-2 focus:ring-[#404040]">
              <div >
                <SelectValue placeholder="Sort by" />
              </div>
              {/* <CalendarDays className="h-4 w-4 md:hidden" /> */}
            </SelectTrigger>
            <SelectContent className="bg-[#303030] border-[#404040]">
              {selectSort.map((item, index) => (
                <div key={index}>
                  <SelectItem value={item.value} className="text-gray-300 hover:text-white focus:bg-[#404040] focus:text-white">
                    <div className="flex items-center">
                      {item.title}
                      <item.icon className="ml-2 h-3 w-3 opacity-50" />
                    </div>
                  </SelectItem>
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        {filteredAndSortedFeedbacks.length === 0 && (
          <div className="flex justify-center items-center h-[calc(100dvh-202px)]">
            <p className="text-slate-200 text-center text-2xl">
              No feedback yet 👀
            </p>
          </div>
        )}
        <ul className="flex flex-col gap-2 w-full">
          {filteredAndSortedFeedbacks.map((feedback: Feedback) => (
            <li
              key={feedback.id}
              className="flex gap-2 bg-[#303030] rounded-[10px] p-5 flex-col"
            >
              <div className="flex justify-between items-center w-full flex-wrap">
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
              </div>
              <div className="flex items-center gap-3 ">
                {feedback.name && <p className="text-xs text-[#606060]"> by: {feedback.name}</p>}
                <p className="text-xs text-[#606060]">
                  {formatDate(feedback.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}