"use client";
import { projects } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import ProjectCard from "./ProjectCard";
import NoProject from "../../assets/NoProjects.svg";
import Image from "next/image";
import { useState } from "react";
import Modal from "./DeleteModal";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import SubscribeBtn from "@/app/(user)/payments/subscribeButton";

type Project = InferSelectModel<typeof projects>;

type Props = {
  projects: Project[];
  subscribed: boolean | null;
};

const ProjectsList = ({ projects, subscribed }: Props) => {
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

         {!subscribed && <PayWall />}
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
        No Projects found
      </h2>
    </main>
  );
};

const PayWall = () => {
  return (
    <li className=" bg-transparent">
      <Card className="flex flex-col h-[200px] bg-transparent border border-gray-200 rounded-md md:w-[400px] w-full overflow-hidden ">
        <CardHeader className="flex-1">
          <div className="flex justify-between relative">
            <CardTitle>Upgrade to Pro</CardTitle>
            <div className="bg-blue-500 size-20 blur-[40px] absolute right-0 -top-10  -z-[-1]" />
          </div>
          <CardDescription>Get access to all features</CardDescription>
        </CardHeader>
        <CardFooter>
          <SubscribeBtn price={'price_1PtLMzB35fil6MWOKpoSE4rd'} />
        </CardFooter>
      </Card>
    </li>
  );
};
