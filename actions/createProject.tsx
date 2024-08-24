"use server"
import { projects } from '@/db/schema'
import { db } from '@/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


export async function createProject(formData: FormData) {
    const {userId} = auth()

    const project = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        url: formData.get('url') as string,
        userId: userId
    }

   const [newProjectId] = await db.insert(projects).values(project).returning({insertId: projects.id})

   console.log('new id' + newProjectId)

   redirect(`/projects/${newProjectId.insertId}/instructions`)
}