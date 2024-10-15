import React from "react";

export default async function FeedbackList({
  feedbacks,
}: {
  feedbacks: any;
}) {
  return (
    <div className={`bg-[#202020] p-5 rounded-[20px] text-white md:h-full custom-scrollbar md:max-w-[600px] h-[500px] overflow-auto md:min-w-[500px]`}>
      <h1 className="text-2xl mb-5 text-white">
        Feedbacks <span className="wave">👋</span>
      </h1>

      <div>
        {feedbacks.length === 0 && (
          <div className="flex justify-center items-center  h-[calc(100dvh-202px)]">
            <p className="text-slate-200 text-center text-2xl">
              No feedback yet 👀
            </p>
          </div>
        )}
        <ul className="flex flex-col gap-2 w-full">
          {feedbacks.map((feedback: any) => (
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
  );
}
