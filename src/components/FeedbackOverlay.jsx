// src/components/FeedbackOverlay.js
import React, { useState } from 'react';

const FeedbackOverlay = ({ feedback, onClose, onRespond }) => {
  const [responseComment, setResponseComment] = useState('');

  const handleResponseSubmit = (status) => {
    if (!responseComment.trim()) {
      alert('Please enter a valid response.');
      return;
    }
    onRespond(feedback.id, status, responseComment); // Call the response update function
  };

  return (
    <div className="feedback-overlay">
      <h2>Feedback from {feedback.name}</h2>
      <p>{feedback.body}</p>
      <textarea
        placeholder="Your Response"
        value={responseComment}
        onChange={(e) => setResponseComment(e.target.value)} // Update response comment state
      />
      <div className="overlay-buttons">
        <button onClick={() => handleResponseSubmit('Acknowledged')}>Acknowledge</button>
        <button onClick={() => handleResponseSubmit('Addressed')}>Address</button>
        <button onClick={() => handleResponseSubmit('Ignored')}>Ignore</button>
      </div>
      <button onClick={onClose}>Close</button> {/* Close button */}
    </div>
  );
};

export default FeedbackOverlay;
