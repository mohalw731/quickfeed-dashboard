"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export default function AddNewProjectButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-blue-500 hover:bg-blue-600 hover:scale-105">
      {pending ? <Loader2 className="size-5 animate-spin" /> : "Create Project"}
    </Button>
  );
}
