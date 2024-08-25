import { db } from '@/db'
import { projects } from '@/db/schema'
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import React from 'react'
import AddNewProject from '@/components/dashborad/AddNewProject';
import ProjectsList from './ProjectList';

export default  async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const userProjects = await db.select().from(projects).where(eq(projects.userId, userId));


  return (
    <div className=''>
      <AddNewProject/>
      <ProjectsList projects={userProjects}/>
    </div>
  )
}
