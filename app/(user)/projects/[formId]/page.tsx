import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import FeedbackList from "@/components/dashborad/FeedbackList";
import FeedbackOverview from "@/components/FeedbackOverview";
import ProjectOverview from "@/components/ProjectOverview";
import FeedbackAnalysis from "@/components/FeedbackAnalyze";

export default async function Page({ params }: { params: { formId: string } }) {
  const projectId = params.formId;
  if (!projectId)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-500">
        Invalid Project ID
      </div>
    );

  const projects = await db.query.projects.findMany({
    where: eq(dbProjects.id, parseInt(projectId)),
    with: {
      feedbacks: true,
    },
  });

  if (!projects.length)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-500">
        Project not found
      </div>
    );

  const project = projects[0];
  const feedbackMessages = project.feedbacks.map(
    (feedback) => `feedback: ${feedback.message}\nrating: ${feedback.rating}`
  );

  return (
    <div className="flex  gap-5 md:flex-row flex-col md:h-[calc(100dvh-100px)]  mb-20 justify-center">
      <section className=" flex  gap-5 flex-col">
        <div className="flex gap-5 lg:flex-row flex-col">
          <ProjectOverview project={project} />
          <FeedbackOverview project={project.feedbacks} />
        </div>
        <FeedbackAnalysis
          feedbackMessages={feedbackMessages}
          id={project.id.toString()}
        />
      </section>
      <FeedbackList feedbacks={project.feedbacks} projectId={project.id} />
    </div>
  );
}
