import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function ProjectOverview({ project }: any) {
  return (
    <div className="flex flex-col gap-2 bg-[#202020] rounded-[20px] p-5 max-h-52  md:w-[400px] w-full justify-between ">
      <h1 className="text-3xl font-semibold text-white md:mb-20 mb-10 ">
        {project.name}
      </h1>
      <div className="flex gap-2">
        {project.url && (
          <Link href={project.url} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#303030] hover:bg-[#404040] text-white">
              View Project
            </Button>
          </Link>
        )}
        <Link href={`/projects/${project.id}/instructions`}>
          <Button className="bg-[#303030] hover:bg-[#404040] text-white hover:text-white">
            View Instructions
          </Button>
        </Link>
      </div>
    </div>
  );
}
