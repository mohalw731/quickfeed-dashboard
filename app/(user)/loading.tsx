import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-200px)] items-center justify-center">
      <Loader2 className="size-7 animate-spin text-blue-500" />
    </div>
  );
}
