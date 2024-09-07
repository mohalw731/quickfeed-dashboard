"use client";
import { projects } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import ProjectCard from "./ProjectCard";
import NoProject from "../../assets/NoProjects.svg";
import Image from "next/image";
import { useState } from "react";
import Modal from "./DeleteModal";

type Project = InferSelectModel<typeof projects>;

type Props = {
  projects: Project[];
};

const ProjectsList = ({ projects }: Props) => {
  const [id, setId] = useState<number>(0);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mt-10">
        {projects.length === 0 ? (
          <NoProjects />
        ) : (
          <ul className="flex md:flex-row flex-col gap-4">
            {projects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                project={project}
                setId={setId}
                setOpen={setOpen}
              />
            ))}
          </ul>
        )}
      </div>
      {<Modal open={open} setOpen={setOpen} id={id} />}
    </>
  );
};
export default ProjectsList;

const NoProjects = () => {
  return (
    <main className="flex items-center justify-center flex-col md:h-[calc(100dvh-500px)]  h-[calc(100dvh-300px)] ">
      <Image src={NoProject} alt="No Projects" width={150} height={200} />
      <h2 className="text-2xl mt-4 text-slate-400 fontbold">
        No Projects found{" "}
      </h2>
    </main>
  );
};
