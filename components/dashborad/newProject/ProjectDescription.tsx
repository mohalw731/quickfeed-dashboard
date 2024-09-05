'use client'
import { Label } from '@radix-ui/react-label'
import { Loader2, Sparkles } from 'lucide-react'
import useAI from '@/hooks/useAI'
import { Textarea } from '@/components/ui/textarea'

export default function AddNewProjectDescription() {
 const {generatedText, setGeneratedText, loading, handleAIGenerate} = useAI()
  return (
    <div className="flex flex-col gap-2 my-2">
    <Label htmlFor="description" className="flex items-center justify-between">Description {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Sparkles className="h-4 w-4 cursor-pointer" onClick={handleAIGenerate}/>}</Label>
    <Textarea
      name="description"
      id="description"
      placeholder="Description (what do you do?)"
      value={generatedText || ""}
      onChange={(e) => setGeneratedText(e.target.value)}
      required
    />
  </div>
  )
}
