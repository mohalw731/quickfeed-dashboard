import AddNewProject from '@/components/AddNewProject'
import { db } from '@/db'
import { projects } from '@/db/schema'
import React from 'react'

export default  async function Dashboard() {
  const allProjects = await db.select().from(projects)
  return (
    <div className=''>
      <AddNewProject/>
    </div>
  )
}
