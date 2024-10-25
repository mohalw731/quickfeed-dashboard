"use client";
import { Label } from "@radix-ui/react-label";
import { Loader2, Sparkles } from "lucide-react";
import useAI from "@/hooks/useAI";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const MAX_CHARACTERS = 150

export default function AddNewProjectDescription() {
  const { generatedText, setGeneratedText, loading, handleAIGenerate } = useAI();

  const [characterCount, setCharacterCount] = useState(generatedText ? generatedText.length : 0)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.slice(0, MAX_CHARACTERS)
    setGeneratedText(newText)
    setCharacterCount(newText.length)
  };
  
  return (
    <div className="flex flex-col  gap-2 my-2">
      <Label
        htmlFor="description"
        className="flex items-center justify-between"
      >
        Description{" "}
        {loading ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : (
          <Sparkles
            className="h-4 w-4 cursor-pointer"
            onClick={handleAIGenerate}
          />
        )}
      </Label>
      <Textarea
        name="description"
        id="description"
        placeholder="Description (what do you do?)"
        value={generatedText || ""}
        onChange={handleTextChange}
        required
        maxLength={MAX_CHARACTERS}
        className="bg-[#E9ECEF] dark:bg-[#171717]"
        aria-describedby="character-count"
      />
      <div 
        id="character-count"
        className="text-sm text-muted-foreground text-right"
      >
        {MAX_CHARACTERS - characterCount} / {MAX_CHARACTERS}
      </div>
    </div>
  );
}
