"use server";
import { projects } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function createProject(formData: FormData) {
  const { userId } = auth();

  const project = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    url: formData.get("url") as string,
    userId: userId,
  };

  const [newProjectId] = await db
    .insert(projects)
    .values(project)
    .returning({ insertId: projects.id });

  if (!newProjectId) {
    throw new Error("Failed to create project");
  }

  redirect(`/projects/${newProjectId.insertId}/instructions`);
}
