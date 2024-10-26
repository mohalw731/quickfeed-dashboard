// FeedbackList.tsx
"use client"

import React, { useState } from "react";
import { FilterButtons } from "./FilterButtons";
import { SortSelect } from "./SortSelect";
import { FeedbackItem } from "./FeedbackItem";
import { Feedback } from "@/types/feedbackTypes";

type FilterType = "all" | "bad" | "okay" | "good";
type SortType = "newest" | "oldest" | "last7days" | "last30days";

export default function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");

  const filteredAndSortedFeedbacks = feedbacks
    .filter((feedback) => filterFeedback(feedback, filter))
    .filter((feedback) => sortFeedback(feedback, sort))
    .sort((a, b) => sortByDate(a, b, sort));

  return (
    <div className="bg-[#EDF0F2] dark:bg-[#0F0F11] p-5 rounded-[20px] md:h-full custom-scrollbar md:max-w-[600px] h-[500px] overflow-auto md:min-w-[600px]">
      <h1 className="text-2xl mb-5">Feedbacks <span className="wave">👋</span></h1>
      <div className="flex justify-between items-start mb-5 md:flex-row flex-col gap-2">
        <FilterButtons filter={filter} setFilter={setFilter} />
        <SortSelect sort={sort} setSort={setSort} />
      </div>

      {filteredAndSortedFeedbacks.length === 0 ? (
        <div className="flex justify-center items-center h-[calc(100dvh-202px)]">
          <p className="text-center text-2xl">No feedback yet 👀</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2 w-full">
          {filteredAndSortedFeedbacks.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </ul>
      )}
    </div>
  );
}

function filterFeedback(feedback: Feedback, filter: FilterType) {
  if (filter === "all") return true;
  if (filter === "bad" && (feedback.rating === 1 || feedback.rating === 2)) return true;
  if (filter === "okay" && feedback.rating === 3) return true;
  if (filter === "good" && (feedback.rating === 4 || feedback.rating === 5)) return true;
  return false;
}

function sortFeedback(feedback: Feedback, sort: SortType) {
  if (!feedback.createdAt) return false;
  const now = new Date();
  const feedbackDate = new Date(feedback.createdAt);
  if (sort === "last7days") {
    return feedbackDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
  if (sort === "last30days") {
    return feedbackDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
  return true;
}

function sortByDate(a: Feedback, b: Feedback, sort: SortType) {
  if (!a.createdAt || !b.createdAt) return 0;
  return sort === "newest"
    ? b.createdAt.getTime() - a.createdAt.getTime()
    : a.createdAt.getTime() - b.createdAt.getTime();
}
