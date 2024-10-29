import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import React from "react";
import AddNewProject from "@/components/dashborad/add-project/AddNewProjectForm";
import { getSubscription } from "@/actions/userSubscriptions";
import ProjectsList from "@/components/dashborad/projects/project-list/ProjectList";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  const subscribed = await getSubscription({ userId });


  return (
    <div>
      <AddNewProject
        subscribed={subscribed as boolean}
        projects={userProjects}
      />
      <ProjectsList
        projects={userProjects}
        subscribed={subscribed as boolean}
      />
    </div>
  );
}
