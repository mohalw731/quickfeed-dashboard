"use client";
import React, { useEffect, useState } from "react";

export default function FeedbackOverview({ project }: any) {
  // get feedback and short them by rating
  const feedback = project.map((item: any) => item.rating);
  const good = feedback.filter((item: any) => item === 5 || item === 4).length;
  const okey = feedback.filter((item: any) => item === 3).length;
  const bad = feedback.filter((item: any) => item === 1 || item === 2).length;
  const total = project.length;

  // get average rating
  const [overallRating, setOverallRating] = useState(0);
  const calculateOverallRating = (ratingsArray: number[]) => {
    if (ratingsArray.length === 0) 0;

    const total = ratingsArray.reduce((acc, current) => acc + current, 0);
    const average = total / ratingsArray.length;
    return Math.round(average * 2) / 2;
  };

  useEffect(() => {
    const rating = calculateOverallRating(feedback);
    setOverallRating(rating);
  }, [feedback]);

  return (
    <div className="flex flex-col gap-2 bg-[#202020] rounded-[20px] p-5  md:w-[400px] w-full  justify-between max-h-52">
      <div className="flex gap-2 flex-col">
        <h2 className="text-xl text-white mb-2">Feedback overview 🔎</h2>
        <ul className="flex gap-2">
          <li className="text-black bg-green-600 px-2 py-1 rounded-lg">
            Good: {good}
          </li>
          <li className="text-black bg-yellow-400 px-2 py-1 rounded-lg">
            Okey: {okey}
          </li>
          <li className="text-black bg-red-700 px-2 py-1 rounded-lg">
            Bad: {bad}
          </li>
        </ul>
      </div>

      <div className="flex justify-between mt-4">
        <p className="text-white">Total: {total}</p>
        <p className="text-black bg-slate-200 py-1 px-2 rounded-lg text-sm">Average: {overallRating}</p>
      </div>
    </div>
  );
}
