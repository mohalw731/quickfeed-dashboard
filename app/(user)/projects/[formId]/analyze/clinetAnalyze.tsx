'use client'

import React, { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Loader2, Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface AnalysisResult {
  text: string
  timestamp: number
}

export default function FeedbackAnalysis({
  feedbackMessages,
}: {
  feedbackMessages: string[]
}) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null)
  const [customPrompt, setCustomPrompt] = useState<string>('')
  const [tokenCount, setTokenCount] = useState<number>(150)
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  useEffect(() => {
    const storedCooldownEnd = localStorage.getItem("analysisCooldownEnd")
    const storedAnalysis = localStorage.getItem("analysisResult")

    if (storedCooldownEnd) {
      setCooldownEnd(parseInt(storedCooldownEnd, 10))
    }

    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis))
    }
  }, [])
  const handleAnalyze = async (useCustomPrompt: boolean = false) => {
    setIsAnalyzing(true)
    const prompt = useCustomPrompt
      ? customPrompt + `\n\nFeedback: ${feedbackMessages.join(", ")}\n\nAnalysis:`
      : `
      Analyze the following feedback thoroughly. Identify the key areas for improvement and provide actionable suggestions to enhance the overall experience. Focus on providing a detailed analysis of the strengths and weaknesses mentioned in the feedback, along with clear recommendations for improvement.

      Feedback: ${feedbackMessages.join(", ")}

      Analysis:

      Offer an in-depth assessment based on the feedback provided, identifying positive aspects and areas requiring improvement.
      Suggestions:

      Provide clear and actionable recommendations for improving the areas highlighted in the feedback.
    `

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: tokenCount,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )

      const newAnalysis: AnalysisResult = {
        text: response.data.choices[0].message.content,
        timestamp: Date.now(),
      }
      setAnalysis(newAnalysis)

      const newCooldownEnd = Date.now() + 7 * 24 * 60 * 60 * 1000 // 1 week from now
      setCooldownEnd(newCooldownEnd)
      localStorage.setItem("analysisCooldownEnd", newCooldownEnd.toString())
      localStorage.setItem("analysisResult", JSON.stringify(newAnalysis))
    } catch (error) {
      console.error("Error generating analysis:", error)
    } finally {
      setIsAnalyzing(false)
      setIsSettingsOpen(false)
    }
  }

  const isButtonDisabled =
    isAnalyzing || (cooldownEnd && Date.now() < cooldownEnd)

  const getRemainingTime = () => {
    if (!cooldownEnd) return null
    const remaining = cooldownEnd - Date.now()
    if (remaining <= 0) return null
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000))
    const hours = Math.floor(
      (remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    )
    return `${days}d ${hours}h`
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="h-[calc(100dvh-200px)]  flex items-center justify-center ">
      <Card className="w-full max-w-2xl space-y-6 md:p-8  p-5 bg-white shadow-lg rounded-2xl">
        <div className="flex justify-between items-center">
          <h1 className="md:text-3xl text-xl  text-black">Feedback Analysis</h1>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-xl">
              <DialogHeader>
                <DialogTitle >Analysis Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea 
                  placeholder="Enter custom prompt..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tokens: {tokenCount}</span>
                    <span>Max: 500</span>
                  </div>
                  <Slider
                    value={[tokenCount]}
                    onValueChange={(value ) => setTokenCount(value[0])}
                    min={100}
                    max={500}
                    step={1}
                    className="w-full"
                  />
                </div>
                <Button 
                  onClick={() => handleAnalyze(true)} 
                  disabled={isAnalyzing || !customPrompt ||isButtonDisabled || !feedbackMessages.length}
                  className="w-full h-10 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Run Custom Analysis
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => handleAnalyze(false)} 
            disabled={isButtonDisabled || !feedbackMessages.length}
            className="w-full h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {isAnalyzing ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              'Analyze Feedback'
            )}
          </Button>
          {cooldownEnd && Date.now() < cooldownEnd && (
            <p className="text-sm text-gray-500 text-center">
              Next analysis available in: {getRemainingTime()}
            </p>
          )}
        </div>

        {analysis && (
          <div className="mt-6 p-4 bg-gray-100 rounded-xl transition-all duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Latest Analysis Result</h2>
            <hr className="my-2"/>
            <ReactMarkdown className="prose max-w-none text-gray-700">
              {analysis.text}
            </ReactMarkdown>
            <p className="text-sm text-gray-400 mt-4">
              Generated on: {formatDate(analysis.timestamp)}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}