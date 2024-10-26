import React from "react";

export default function DefaultPromt({ tokenCount, feedbackMessages }: any) {
  const DefaultPromt = ` You are an expert AI system specializing in customer experience and feedback analysis. 
  Your task is to comprehensively analyze the provided customer feedback, identifying key patterns, strengths, weaknesses, and opportunities for improvement. 
  Follow the detailed structure below to ensure the most valuable insights are surfaced.

  Feedback: ${feedbackMessages.join(", ")} and use max tokens: ${tokenCount}

  Detailed Feedback Analysis:

  1. Key Themes & Trends:
    - Extract and summarize recurring themes or trends in the feedback. Focus on patterns in user experiences, both positive and negative. Highlight any common phrases or sentiments that appear frequently across multiple feedback entries.

  2. Sentiment Breakdown:
    - Analyze the overall sentiment of the feedback, categorizing it into positive, negative, or neutral.
    - For each sentiment type, identify what specific aspects of the product or service are driving that sentiment.

  3. Strengths (What’s Working Well):
    - Highlight specific strengths praised by customers.
    - Explain why these strengths matter to customers and how they contribute to satisfaction.
    - Provide examples of how these strengths have impacted the user experience positively.

  4. Weaknesses (Areas Needing Improvement):
    - Identify any weaknesses or areas of dissatisfaction.
    - Offer context on why these areas are problematic, considering the user's journey or expectations.
    - Group feedback into categories such as usability issues, performance problems, missing features, etc.

  5. User Journey Analysis:
    - Break down the feedback according to the different stages of the user journey (e.g., onboarding, using the product, after-sales support).
    - Provide insights into how customer satisfaction varies at each stage and where the most significant pain points lie.

  6. Actionable Suggestions for Improvement:
    - For each weakness or area needing improvement, provide at least two actionable suggestions that the business could implement to address the concerns raised.
    - Ensure suggestions are practical, considering resource constraints and potential impact.

  7. Competitive Benchmarking:
    - Compare the feedback to general industry standards or best practices. Are there areas where the product/service excels or falls behind when compared to competitors?
    - If available, suggest competitive features or approaches that could improve the overall experience.

  8. Impact Prioritization:
    - Rank the identified issues and improvements by their potential impact on overall customer satisfaction. Focus on changes that could bring the most significant positive impact.
    - Explain why certain improvements should be prioritized over others based on customer feedback and business goals.

  9. Quantitative Insights:
    - Include a brief statistical overview of the feedback:
      - Positive Feedback Ratio: What percentage of users had a predominantly positive experience?
      - Negative Feedback Ratio: What percentage of users had a predominantly negative experience?
      - Highlight any particularly extreme opinions (very positive or very negative) and their frequency.

  10. Customer Loyalty & Retention Analysis:
    - Provide insights into the likelihood of customer retention based on the tone of the feedback.
    - Analyze if customers seem likely to continue using the service/product or churn based on their feedback. If possible, quantify the potential churn risk.

  11. Additional Insights (Optional):
    - Identify any feedback that, while not critical, presents interesting insights or potential opportunities for innovation.
    - Highlight user suggestions for new features or use cases that the business might not have considered.

  12. General Tone & Emotion:
    - Assess the emotional tone of the feedback. Is the feedback given with frustration, enthusiasm, or neutrality? Break down emotional cues and their influence on overall customer satisfaction.

  Provide the analysis in a structured markdown format, with each section clearly labeled. Use bullet points and concise summaries where appropriate.
  `;

  return DefaultPromt;
}


