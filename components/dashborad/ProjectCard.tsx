'use client'

import { deleteProject } from "@/actions/deleteProject"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ProjectCard({project}: any) {
  return (
    <li key={project.id} className=" bg-transparent w-full">
    <Card className="flex flex-col h-[200px] bg-transparent border-2 border-gray-200 rounded-2xl md:w-[400px] w-full">
      <CardHeader className="flex-1">
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
        <Button onClick={() => deleteProject(project.id)}>del</Button>
      </CardHeader>
      <CardFooter>
        <Link href={`/projects/${project.id}`}>
          <Button>View Project</Button>
        </Link>
      </CardFooter>
    </Card>
  </li>
  )
}
