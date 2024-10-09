import { Chart } from "@/components/Chart";
import FeedbackList from "@/components/dashborad/FeedbackList";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
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

  return (
    <div className="mt-5 w-full ">
      {projects.map((project) => (
        <div key={project.id}>
          <section className="flex items-start justify-center md:gap-10 gap-20 w-full md:flex-row flex-col pb-10">
            <div className="flex gap-5 flex-col max-w-xl w-full">
              <h1 className="md:text-6xl text-2xl">{project.name}</h1>

              <div className="flex gap-2">
                <a
                  href={project?.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">View Project</Button>
                </a>
                <Link href={`/projects/${project.id}/instructions`}>
                  <Button variant="outline">View Instructions</Button>
                </Link>
              </div>
              <Chart project={project.feedbacks} />
             
            </div>
            <FeedbackList
              feedbacks={project.feedbacks}
              projectId={project.id}
            />

           

          </section>
        </div>
      ))}
    </div>
  );
}
