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

export default function ProjectCard({ project, setId, setOpen }: any) {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <>
      <li key={project.id} className=" bg-transparent">
        <Card className="flex flex-col h-[200px] bg-transparent border border-[#CED4DA] dark:border-[#131314] rounded-md md:w-[400px] w-full overflow-hidden ">
          <CardHeader className="flex-1">
            <div className="flex justify-between relative">
              <CardTitle className="">
                <h1>{capitalize(project.name)}</h1>
              </CardTitle>
              <div className="bg-blue-500 size-20 blur-[50px] absolute right-0 -top-10 -z-[-1]" />
              <div className="z-[10]">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical className="dark:text-white text-[#343A40]" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => {
                        setId(project.id);
                        setOpen(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardDescription>
              <p>{project.description}</p>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={`/projects/${project.id}`}>
              <Button
                className="bg-[#343A40] dark:bg-[#E2E2E2]"
                size={"sm"}
              >
                View Project
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </li>
    </>
  );
}
