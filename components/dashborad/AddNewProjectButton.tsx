"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import useAI from "@/hooks/useAI";

export default function AddNewProjectButton() {
  const { loading} = useAI()

  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || loading}
      className="bg-blue-500 hover:bg-blue-600 hover:scale-105 disabled:bg-blue-300"
    >
      {pending || loading ? <Loader2 className="size-5 animate-spin" /> : "Create Project"}
    </Button>
  );
}
