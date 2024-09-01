// This component will run on the server to fetch data
import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ServerComponent({ formId }: { formId: string }) {
  if (!formId) return { feedbackMessages: [] };

  const projectId = formId;

  const projects = await db.query.projects.findMany({
    where: eq(dbProjects.id, parseInt(projectId)),
    with: {
      feedbacks: true,
    },
  });

  const feedbacks = projects.map((project) => project.feedbacks).flat();
  const feedbackMessages = feedbacks.map((feedback) => feedback.message);

  return { feedbackMessages };
}
