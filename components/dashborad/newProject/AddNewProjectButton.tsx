"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import useAI from "@/hooks/useAI";
import { Button } from "@/components/ui/button";


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
