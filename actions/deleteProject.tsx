"use server";
import { projects, feedbacks } from "@/db/schema";
import { db } from "@/db";
import { eq, and } from "drizzle-orm/expressions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function deleteProject(projectId: number) {
  const { userId } = auth();
  const projectToDelete = await db
    .select()
    .from(projects)
    .where(
      and(eq(projects.id, projectId), eq(projects.userId, userId as string))
    );

  if (!projectToDelete.length) {
    throw new Error(
      "Project not found or you do not have permission to delete this project."
    );
  }

  await db.transaction(async (trx) => {
    await trx.delete(feedbacks).where(eq(feedbacks.projectId, projectId));
    await trx.delete(projects).where(eq(projects.id, projectId));
  });

  redirect("/dashboard");
}
