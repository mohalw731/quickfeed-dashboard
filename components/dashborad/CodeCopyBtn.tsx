"use client";
import { Check, Clipboard } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react";


const CopyBtn = ({ text }: {
  text: string
}) => {

  const [copied, setCopied] = useState(false)
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={() => copyToClipboard(text)} className={`${copied ? "text-green-500" : "text-slate-500"} absolute p-2 right-0 top-0`}>{copied ? <Check/> : <Clipboard />}</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy code</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}

export default CopyBtn;