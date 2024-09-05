"use client";

import { deleteProject } from "@/actions/deleteProject";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

export default function ProjectCard({ project }: any) {

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <li key={project.id} className=" bg-transparent">
      <Card className="flex flex-col h-[200px] bg-transparent border border-gray-200 rounded-md md:w-[400px] w-full overflow-hidden">
        <CardHeader className="flex-1 ">
          <div className="flex justify-between relative">
            <CardTitle>{capitalize(project.name)}</CardTitle>
            <div className=" bg-blue-500 w-24 h-24 rounded-full blur-[70px] overflow-hidden absolute -right-8 -top-12 -z-0" />
            <div className="z-[10]">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="text-black" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => deleteProject(project.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={`/projects/${project.id}`}>
            <Button>View Project</Button>
          </Link>
        </CardFooter>
      </Card>
    </li>
  );
}
