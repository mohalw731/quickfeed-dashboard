import { createProject } from "@/actions/createProject";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AddNewProjectHeader from "../header/ProjectHeader";
import { Label } from "@/components/ui/label";
import AddNewProjectDescription from "./ProjectDescription";
import useAI from "@/hooks/useAI";
import AddNewProjectButton from "../header/AddNewProjectButton";

type Props = {
  subscribed: boolean;
  projects: any;
};
const AddNewProject = ({ subscribed, projects }: Props) => {
  return (
    <Dialog>
      <AddNewProjectHeader
        subscribed={subscribed as boolean}
        projects={projects}
      />
      <DialogContent className="rounded-md bg-[#DEE2E6] dark:bg-[#0F0F11] md:max-w-md max-w-[350px]">
        <DialogHeader>  
          <DialogTitle><h1>New Project</h1></DialogTitle>
          <DialogDescription>
            <p>Create a new project to get started</p>
          </DialogDescription>
        </DialogHeader>
        <form className="flex gap-4 flex-col" action={createProject}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Project Name"
                className="bg-[#E9ECEF] dark:bg-[#171717]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                placeholder="https://example.com"
                className="bg-[#E9ECEF] dark:bg-[#171717]"
                required
              />
            </div>
          </div>
          <AddNewProjectDescription />

          <AddNewProjectButton />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewProject;
