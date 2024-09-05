import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import React from "react";
import ProjectsList from "../../../components/dashborad/ProjectList";
import Modal from "@/components/dashborad/DeleteModal";
import AddNewProject from "@/components/dashborad/newProject/AddNewProjectForm";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  return (
    <div>
      <AddNewProject />
      <ProjectsList projects={userProjects} />
    </div>
  );
}
