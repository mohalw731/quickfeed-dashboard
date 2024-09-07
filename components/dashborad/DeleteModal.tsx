import { X } from "lucide-react";
import { Button } from "../ui/button";
import { deleteProject } from "@/actions/deleteProject";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export default function Modal({ open, setOpen, id }: ModalProps) {
  return (
    <div className={`w-full h-full ${open ? "overlay" : "bg-transparent"}`}>
      <main
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full ${open ? 'block' : 'hidden'}`}
      >
        <div className="z-[110] bg-white p-5 w-full md:max-w-md max-w-[350px] mx-auto rounded-md flex flex-col gap-5">
          <h2 className="text-xl text-red-500 flex items-center justify-between">
            Delete Project <X className="text-black cursor-pointer" onClick={() => setOpen(false)} />
          </h2>
          <p>Are you sure you want to delete this project?</p>
          <div className="flex gap-3">
            <Button className="bg-red-600 hover:bg-red-700 " size={"sm"} onClick={() => {deleteProject(id); setOpen(false)}}>Delete</Button>

              <Button
                variant={"outline"}
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
