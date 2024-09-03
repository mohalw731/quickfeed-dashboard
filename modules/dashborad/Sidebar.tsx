import React from 'react'
import ProjectsList from './ProjectList'
import { db } from '@/db';
import { projects } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export default async function Sidebar() {
    const { userId } = auth();
    if (!userId) {
      return null;
    }
  
    const userProjects = await db.select().from(projects).where(eq(projects.userId, userId));
  return (
    <main className='border w-full  max-w-[250px]  h-screen bg-white '>
      <ProjectsList projects={userProjects} />

      
    </main>
  )
}
