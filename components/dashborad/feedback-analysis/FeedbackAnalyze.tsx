"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Loader2, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubscribeBtn from "@/app/(user)/payments/subscribeButton";
import { monthlyPlanId } from "@/lib/payments";
import DefaultPromt from "@/utils/analysisPrompt";
import Analysis from "./Analysis";

interface AnalysisResult {
  text: string;
  timestamp: number;
}

interface CooldownData {
  [key: string]: number;
}

export default function FeedbackAnalysis({
  feedbackMessages,
  id,
  subscribed,
}: {
  feedbackMessages: string[];
  id: string;
  subscribed: boolean;
}) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cooldowns, setCooldowns] = useState<CooldownData>({});
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [tokenCount, setTokenCount] = useState<number>(1000);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(true);

  // Load stored cooldowns and analysis on mount
  useEffect(() => {
    const storedCooldowns = localStorage.getItem("analysisCooldowns");
    const storedAnalysis = localStorage.getItem(`analysisResult_${id}`);

    if (storedCooldowns) {
      setCooldowns(JSON.parse(storedCooldowns));
    }

    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis));
      setShowButton(false);
    }

    const checkCooldown = () => {
      if (cooldowns[id] && Date.now() >= cooldowns[id]) {
        setCooldowns((prev) => {
          const newCooldowns = { ...prev };
          delete newCooldowns[id];
          localStorage.setItem(
            "analysisCooldowns",
            JSON.stringify(newCooldowns)
          );
          return newCooldowns;
        });
        setShowButton(true);
      }
    };

    const interval = setInterval(checkCooldown, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [id]); // Only depend on `id`

  // Show the button if cooldown for the given id has passed
  useEffect(() => {
    if (!cooldowns[id] || Date.now() < cooldowns[id]) return;
    setShowButton(true);
  }, [cooldowns, id]);

  // Analyze feedback
  const handleAnalyze = async (useCustomPrompt: boolean = false) => {
    setIsAnalyzing(true);
    const prompt = useCustomPrompt
      ? customPrompt +
        `use max tokens: ${tokenCount}\n\nFeedback: ${feedbackMessages.join(
          ", "
        )}\n\nAnalysis:`

      : DefaultPromt({ tokenCount, feedbackMessages },);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: tokenCount > 500 ? "gpt-3.5-turbo" : "gpt-4-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: tokenCount ? tokenCount : 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newAnalysis: AnalysisResult = {
        text: response.data.choices[0].message.content,
        timestamp: Date.now(),
      };
      setAnalysis(newAnalysis);

      const newCooldownEnd = Date.now() + 7 * 24 * 60 * 60 * 1000; // 1 week from now
      const updatedCooldowns = { ...cooldowns, [id]: newCooldownEnd };
      setCooldowns(updatedCooldowns);
      localStorage.setItem(
        "analysisCooldowns",
        JSON.stringify(updatedCooldowns)
      );
      localStorage.setItem(`analysisResult_${id}`, JSON.stringify(newAnalysis));
      setShowButton(false);
    } catch (error) {
      console.error("Error generating analysis:", error);
    } finally {
      setIsAnalyzing(false);
      setIsSettingsOpen(false);
    }
  };

  // Button state management
  const isButtonDisabled =
    isAnalyzing || (cooldowns[id] && Date.now() < cooldowns[id]);

  // Get remaining cooldown time
  const getRemainingTime = () => {
    if (!cooldowns[id]) return null;
    const remaining = cooldowns[id] - Date.now();
    if (remaining <= 0) return null;
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    return `${days}d ${hours}h`;
  };

  // Format timestamp into readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full space-y-6 p-5 bg-[#EDF0F2] dark:bg-[#0F0F11] rounded-2xl border-none max-w-[820px] overflow-auto custom-scrollbar md:h-full h-[500px]">
      <div className="flex items-start justify-between">
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
            onValueChange={(value: any) => setTokenCount(value[0])}
            min={100}
            max={1000}
            step={1}
            className="w-full"
          />
        </div>
        {subscribed ? (
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
        ) : (
          <div className="w-full flex justify-center">
            <SubscribeBtn price={monthlyPlanId} />
          </div>
        )}
      </div>
    </DialogContent>
  </Dialog>
      </div>

      <div
        className={`flex-grow overflow-y-auto ${
          analysis?.text
            ? " "
            : "flex flex-col justify-center items-center h-[calc(100%-130px)]"
        }`}
      >
        {showButton && (
          <>
            <div className="flex flex-col items-center gap-5">
              <span className="text-5xl">📊</span>
              <h1 className="md:text-2xl font-mono text-center mb-3">
                Get to understand your customers
              </h1>
            </div>
            {subscribed ? (
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
            ) : (
              <div className="w-full flex justify-center">
                <SubscribeBtn price={monthlyPlanId} />
              </div>
            )}
          </>
        )}
        {cooldowns[id] && Date.now() < cooldowns[id] && (
          <p className="text-sm text-[#343A40]  dark:text-gray-300 text-center">
            Next analysis available in: {getRemainingTime()}
          </p>
        )}

        {analysis && (
          <Analysis
            formatDate={formatDate}
            analysis={analysis}
          />
        )}
      </div>
    </Card>
  );
}
