import FeedbackList from "@/components/FeedbackList";
import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";

export default async function page(params: {
  params: {
    formId: string;
  };
}) {
  const projectId = params.params.formId;
  if (!projectId) return <div>Invalid Project ID</div>;

  const projects = await db.query.projects.findMany({
    where: eq(dbProjects.id, parseInt(projectId)),
    with: {
      feedbacks: true,
    },
  });

  console.log(projects);

  return (
    <div>
      {projects.map((project) => (
        <div className="" key={project.id}>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <p>{project.url}</p>
          <FeedbackList feedbacks={project.feedbacks} />
        </div>
      ))}
    </div>
  );
}
