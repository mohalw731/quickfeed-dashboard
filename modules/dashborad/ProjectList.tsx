import { projects } from "@/db/schema";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InferSelectModel } from "drizzle-orm";
import ProjectCard from "./ProjectCard";

type Project = InferSelectModel<typeof projects>;

type Props = {
  projects: Project[];
};

const ProjectsList = ({ projects }: Props) => {
  return (
    <div className="mt-10">
      {projects.length === 0 ? (
        <NoProjects />
      ) : (
        <ul className="flex w-full gap-4 md:flex-row flex-col">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      )}
    </div>
  );
};
export default ProjectsList;

const NoProjects = () => {
  return (
    <main className="flex items-center justify-center flex-col gap-4 h-[calc(100dvh-500px)] ">
        <h2 className="text-3xl text-slate-400 text-center">
          {/* Start collecting <span className="text-blue-500"> feedbacks</span> */}
        </h2>
    </main>
  );
};
