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
        <Card className="flex flex-col h-[200px] bg-transparent border border-[#202020] rounded-md md:w-[400px] w-full overflow-hidden ">
          <CardHeader className="flex-1">
            <div className="flex justify-between relative">
              <CardTitle className=" text-white">
                {capitalize(project.name)}
              </CardTitle>
              <div className="bg-blue-500 size-20 blur-[50px] absolute right-0 -top-10  -z-[-1]" />
              <div className="z-[10]">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical className="text-white" />
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
            <CardDescription className="text-slate-200">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={`/projects/${project.id}`}>
              <Button
                className="bg-[#202020] hover:bg-[#303030] text-white"
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
