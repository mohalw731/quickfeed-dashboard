"use client"

import React, { useState } from "react";
import axios from "axios";
import { config } from "dotenv";
config({ path: ".env.local" });

export default function ClientComponent({
  feedbackMessages,
}: {
  feedbackMessages: string[];
}) {
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAIGenerate = async () => {
    setLoading(true);
    const prompt = `
      Analyze all the feedbacks. Here are the feedbacks: ${feedbackMessages.join(
        ", "
      )}.
      Give me a to-do list of all the improvements I can do based on the feedback.
    `;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setGeneratedText(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error generating analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Feedback Analysis</h1>
      <button onClick={handleAIGenerate} disabled={loading}>
        {loading ? "Analyzing..." : "Generate Analysis"}
      </button>
      {generatedText && (
        <div>
          <h2>AI Generated To-Do List:</h2>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
}
