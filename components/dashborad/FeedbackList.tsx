import React from 'react'
import Ratings from './ratings'

export default function FeedbackList({ feedbacks }: { feedbacks: any }) {
  return (
    <ul>
      {feedbacks.map((feedback: any) => (
        <li key={feedback.id}>
          {feedback.message}
          <Ratings rating={feedback.rating} />
        </li>
      ))}
    </ul>
  )
}
