import Link from "next/link";
import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectOverview({ project }: any) {
  return (
    <div className="flex flex-col gap-2 bg-[#EDF0F2] dark:bg-[#0F0F11] rounded-[20px] p-5 max-h-52 md:w-[400px] w-full justify-between ">
      <h1 className="text-3xl font-semibold md:mb-20 mb-10 flex items-center justify-between ">
        {project.name}
        <Link href={`/projects/${project.id}/instructions`}>
        <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-6 w-6" />
            </Button>
        </Link>
      </h1>
      <div className="flex gap-2">
        {project.url && (
          <Link href={project.url} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#343A40] dark:bg-[#E2E2E2]">
              View Project
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
