import { Feedback } from "@/types/feedbackTypes";
import { formatDate } from "@/utils/dateUtils";


export function FeedbackItem({ feedback }: { feedback: Feedback }) {
  const ratingClass = feedback.rating === 1 || feedback.rating === 2
    ? "bg-red-600 dark:bg-red-700"
    : feedback.rating === 3
    ? "bg-yellow-400 dark:bg-yellow-500"
    : "bg-green-500 dark:bg-green-600";

  return (
    <li className="flex gap-2 bg-gray-200 dark:bg-[#171717] rounded-[10px] p-5 flex-col">
      <div className="flex justify-between items-center w-full flex-wrap">
        <h1 className="flex flex-col gap-2">{feedback.message}</h1>
        <span className={`${ratingClass} py-1 px-3 rounded-full text-xs`}>
          Rating: {feedback.rating}
        </span>
      </div>
      <div className="flex items-center gap-3 ">
        {feedback.name && <p className="text-xs"> by: {feedback.name}</p>}
        <p className="text-xs">{formatDate(feedback.createdAt)}</p>
      </div>
    </li>
  );
}
