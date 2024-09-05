'use client'
import axios from 'axios';
import { useState } from 'react'

export default function useAI() {
    const [generatedText, setGeneratedText] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleAIGenerate = async () => {
      setLoading(true);
      const prompt = `
        Give me a short description of what kind of project thi is with about 10 words here is what i am doing with "a saas product to understand curstumer feedback data using ai" that was just an example and here is what i am doing : ${generatedText}.
      `;
  
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
          },
          {
            headers: {
              Authorization: `Bearer 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`,
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

    return { generatedText, loading, handleAIGenerate, setGeneratedText };
}