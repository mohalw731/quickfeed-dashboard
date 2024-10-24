import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import FeedbackList from "@/components/dashborad/FeedbackList";
import FeedbackOverview from "@/components/FeedbackOverview";
import ProjectOverview from "@/components/ProjectOverview";
import FeedbackAnalysis from "@/components/FeedbackAnalyze";
import { auth } from "@clerk/nextjs/server";
import { getSubscription } from "@/actions/userSubscriptions";

type Rating = 1 | 2 | 3 | 4 | 5; // If ratings are limited to certain values

type FeedbackItem = {
  id: number;
  name: string | null;
  projectId: number;
  message: string | null;
  rating: Rating; // Ensure rating is typed correctly
  createdAt: Date;
};

export default async function Page({ params }: { params: { formId: string } }) {
  const projectId = params.formId;
  if (!projectId)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-500">
        Invalid Project ID
      </div>
    );

  const { userId } = auth();
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-500">
        User not authenticated
      </div>
    );
  }

  const projects = await db.query.projects.findMany({
    where: and(
      eq(dbProjects.id, parseInt(projectId)),
      eq(dbProjects.userId, userId)
    ),
    with: {
      feedbacks: true,
    },
  });

  if (!projects.length)
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-200px)] text-lg font-medium text-slate-200">
        Project not found 👀
      </div>
    );

  const subscribed = await getSubscription({ userId });

  const project = projects[0];
  const feedbackMessages = project.feedbacks.map(
    (feedback) => `feedback: ${feedback.message}\nrating: ${feedback.rating}`
  );

  return (
    <div className="flex gap-5 md:flex-row flex-col md:h-[calc(100dvh-100px)] mb-10 justify-center">
      <section className="flex gap-5 flex-col">
        <div className="flex gap-5 lg:flex-row flex-col">
          <ProjectOverview project={project} />
          <FeedbackOverview project={project.feedbacks as FeedbackItem[]} />
        </div>
        <FeedbackAnalysis
          feedbackMessages={feedbackMessages}
          id={project.id.toString()}
          subscribed={subscribed as boolean}
        />
      </section>
      <FeedbackList feedbacks={project.feedbacks} />
    </div>
  );
}
