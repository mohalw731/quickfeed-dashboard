import { createProject } from "@/actions/createProject";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import AddNewProjectButton from "./AddNewProjectButton";
import AddNewProjectHeader from "./AddNewProjectHeader";

const AddNewProject = () => {
  return (

      <Dialog>
        <AddNewProjectHeader />
        <DialogContent className="rounded-md  md:max-w-md max-w-[350px]">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Create a new project to get started
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
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Description (what do you do?)"
                required
              />
            </div>
            <AddNewProjectButton />
          </form>
        </DialogContent>
      </Dialog>
  );
};

export default AddNewProject;
