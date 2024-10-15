"use client"

import React, { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Eye, Loader2, Settings } from "lucide-react"
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

interface CooldownData {
  [key: string]: number
}

export default function FeedbackAnalysis({
  feedbackMessages,
  id,
}: {
  feedbackMessages: string[]
  id: string
}) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cooldowns, setCooldowns] = useState<CooldownData>({})
  const [customPrompt, setCustomPrompt] = useState<string>("")
  const [tokenCount, setTokenCount] = useState<number>(150)
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const [showButton, setShowButton] = useState<boolean>(true)

  // Load stored cooldowns and analysis on mount
  useEffect(() => {
    const storedCooldowns = localStorage.getItem("analysisCooldowns")
    const storedAnalysis = localStorage.getItem(`analysisResult_${id}`)

    if (storedCooldowns) {
      setCooldowns(JSON.parse(storedCooldowns))
    }

    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis))
      setShowButton(false)
    }

    const checkCooldown = () => {
      if (cooldowns[id] && Date.now() >= cooldowns[id]) {
        setCooldowns((prev) => {
          const newCooldowns = { ...prev }
          delete newCooldowns[id]
          localStorage.setItem("analysisCooldowns", JSON.stringify(newCooldowns))
          return newCooldowns
        })
        setShowButton(true)
      }
    }

    const interval = setInterval(checkCooldown, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [id]) // Only depend on `id`

  // Show the button if cooldown for the given id has passed
  useEffect(() => {
    if (!cooldowns[id] || Date.now() < cooldowns[id]) return
    setShowButton(true)
  }, [cooldowns, id])

  // Analyze feedback
  const handleAnalyze = async (useCustomPrompt: boolean = false) => {
    setIsAnalyzing(true)
    const prompt = useCustomPrompt
      ? customPrompt +
        `use max tokens: ${tokenCount}\n\nFeedback: ${feedbackMessages.join(
          ", "
        )}\n\nAnalysis:`
      : `Analyze the following feedback thoroughly. Identify the key areas for improvement and provide actionable suggestions to enhance the overall experience. Focus on providing a detailed analysis of the strengths and weaknesses mentioned in the feedback, along with clear recommendations for improvement.

      Feedback: ${feedbackMessages.join(", ")}

      Analysis:

      Offer an in-depth assessment based on the feedback provided, identifying positive aspects and areas requiring improvement.
      Suggestions:

      Provide clear and actionable recommendations for improving the areas highlighted in the feedback.
      use max tokens: ${tokenCount}`

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
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
      const updatedCooldowns = { ...cooldowns, [id]: newCooldownEnd }
      setCooldowns(updatedCooldowns)
      localStorage.setItem("analysisCooldowns", JSON.stringify(updatedCooldowns))
      localStorage.setItem(`analysisResult_${id}`, JSON.stringify(newAnalysis))
      setShowButton(false)
    } catch (error) {
      console.error("Error generating analysis:", error)
    } finally {
      setIsAnalyzing(false)
      setIsSettingsOpen(false)
    }
  }

  // Button state management
  const isButtonDisabled =
    isAnalyzing || (cooldowns[id] && Date.now() < cooldowns[id])

  // Get remaining cooldown time
  const getRemainingTime = () => {
    if (!cooldowns[id]) return null
    const remaining = cooldowns[id] - Date.now()
    if (remaining <= 0) return null
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000))
    const hours = Math.floor(
      (remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    )
    return `${days}d ${hours}h`
  }

  // Format timestamp into readable date
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
    <Card className="w-full space-y-6 p-5 bg-[#202020] rounded-2xl border-none max-w-[820px]  overflow-auto custom-scrollbar md:h-full h-[500px]" >
      <div className="flex items-start justify-between text-white">
        <h1 className="text-2xl">Feedback Analysis ✨</h1>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-xl">
            <DialogHeader>
              <DialogTitle>Analysis Settings</DialogTitle>
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
                  <span>Max: 1000</span>
                </div>
                <Slider
                  value={[tokenCount]}
                  onValueChange={(value) => setTokenCount(value[0])}
                  min={100}
                  max={1000}
                  step={1}
                  className="w-full"
                />
              </div>
              <Button
                onClick={() => handleAnalyze(true)}
                disabled={
                  isAnalyzing ||
                  !customPrompt ||
                  isButtonDisabled ||
                  !feedbackMessages.length
                }
                className="w-full h-10 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Run Custom Analysis
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-grow overflow-y-auto">
        {showButton && (
          <>
            <div className="flex flex-col items-center mb-5">
              <span className="text-3xl">📊</span>
              <h2 className="md:text-2xl font-mono text-center text-white mb-2">
                Get to understand your customers
              </h2>
            </div>
            <Button
              onClick={() => handleAnalyze(false)}
              disabled={isButtonDisabled || !feedbackMessages.length}
              className="w-full h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 ease-in-out transform "
            >
              {isAnalyzing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Analyze Feedback"
              )}
            </Button>
          </>
        )}
        {cooldowns[id] && Date.now() < cooldowns[id] && (
          <p className="text-sm text-gray-300 text-center">
            Next analysis available in: {getRemainingTime()}
          </p>
        )}

        {analysis && (
          <div className="text-black rounded-xl bg-gray-200 p-5 mt-4 ">
            <h2 className="text-xl font-semibold mb-2">Latest Analysis Result</h2>
            <hr className="my-2" />
            <ReactMarkdown className="prose prose-lg">{analysis.text}</ReactMarkdown>
            <p className="text-sm text-gray-500 mt-4">Generated on: {formatDate(analysis.timestamp)}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
