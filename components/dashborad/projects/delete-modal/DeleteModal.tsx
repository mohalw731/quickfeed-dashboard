import { X } from "lucide-react";
import { deleteProject } from "@/actions/deleteProject";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
};

export default function Modal({ open, setOpen, id }: ModalProps) {
  return (
    <div className={`w-full h-full ${open ? "overlay" : "bg-transparent"}`}>
      <main
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full ${open ? "block" : "hidden"}`}
      >
        <div className="z-[110] bg-[#DEE2E6] dark:bg-[#0F0F11] p-5 w-full md:max-w-md max-w-[350px] mx-auto rounded-md flex flex-col gap-5">
          <h2 className="text-xl text-red-500 flex items-center justify-between">
            Delete Project
            <h1>
              <X
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </h1>
          </h2>
          <p>Are you sure you want to delete this project?</p>
          <div className="flex gap-3">
            <Button
              className="bg-red-600 text-white hover:bg-red-700 "
              size={"sm"}
              onClick={() => {
                deleteProject(id);
                setOpen(false);
              }}
            >
              Delete
            </Button>

            <Button
              className="bg-[#343A40] dark:bg-[#E2E2E2]"
              onClick={() => setOpen(false)}
              size={"sm"}
            >
              Cancel
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
