import React from "react";

export default function FeedbackList({ feedbacks }: { feedbacks: any }) {
  return (
    <ul className="max-w-xl flex flex-col gap-2 mt-10">
      {feedbacks.map((feedback: any) => (
        <li
          key={feedback.id}
          className="border-2 rounded-xl w-full p-6 px-5 bg-white flex items-center justify-between"
        >
          {feedback.message}
          <span
            className={
              feedback.rating === 1 || feedback.rating === 2
                ? "bg-red-500 text-white py-1 px-3  rounded-full text-xs"
                : feedback.rating === 3
                ? "bg-yellow-500 text-white py-1 px-3  rounded-full text-xs"
                : feedback.rating === 4 || feedback.rating === 5
                ? "bg-green-500 text-white py-1 px-3  rounded-full text-xs"
                : ""
            }
          >
            Rating: {feedback.rating}
          </span>
        </li>
      ))}
    </ul>
  );
}
