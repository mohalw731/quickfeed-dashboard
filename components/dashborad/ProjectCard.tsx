"use client";
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
import { useState } from "react";
import Modal from "./DeleteModal";

export default function ProjectCard({ project }: any) {
  const [open, setOpen] = useState(false);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
<>
    <li key={project.id} className=" bg-transparent">
      <Card className="flex flex-col h-[200px] bg-transparent border border-gray-200 rounded-md md:w-[400px] w-full overflow-hidden ">
        <CardHeader className="flex-1 ">
          <div className="flex justify-between relative">
            <CardTitle>{capitalize(project.name)}</CardTitle>
            <div className="bg-blue-500 size-20 blur-[40px] absolute right-0 -top-10  -z-[-1]" />
            <div className="z-[20]">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="text-black" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="text-red-500"
                   onClick={() => setOpen(true)}
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
    {<Modal open={open} setOpen={setOpen} project={project}/>}

    </>
  );
}
