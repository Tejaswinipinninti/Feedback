// src/components/FeedbackCard.js
import React from 'react';

const FeedbackCard = ({ feedback, onOpenOverlay }) => {
  return (
    <div className="feedback-card" onClick={() => onOpenOverlay(feedback)}>
      <h3>{feedback.name}</h3>
      <p>{feedback.body}</p>
      <small>Created At: {new Date(feedback.createdAt).toLocaleString()}</small>
      <p>Status: {feedback.responseStatus}</p>
      {feedback.responseComment && (
        <>
          <p>Your Response: {feedback.responseComment}</p>
          <small>Response Time: {new Date(feedback.updatedAt).toLocaleString()}</small>
        </>
      )}
    </div>
  );
};

export default FeedbackCard;
