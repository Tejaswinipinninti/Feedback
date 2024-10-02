// src/components/FeedbackList.js
import React, { useState } from 'react';
import FeedbackCard from './FeedbackCard';
import FeedbackOverlay from './FeedbackOverlay';

const FeedbackList = ({ feedbacks, onResponseUpdate }) => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const openOverlay = (feedback) => {
    setSelectedFeedback(feedback); // Set selected feedback to display overlay
  };

  const closeOverlay = () => {
    setSelectedFeedback(null); // Close the overlay
  };

  const handleRespond = (id, status, comment) => {
    onResponseUpdate(id, status, comment);
    closeOverlay(); // Close overlay after response
  };

  return (
    <div className="feedback-list">
      {feedbacks.map(feedback => (
        <FeedbackCard
          key={feedback.id}
          feedback={feedback}
          onOpenOverlay={openOverlay} // Open overlay on card click
        />
      ))}
      {selectedFeedback && (
        <FeedbackOverlay
          feedback={selectedFeedback}
          onClose={closeOverlay} // Pass close function to overlay
          onRespond={handleRespond}
        />
      )}
    </div>
  );
};

export default FeedbackList;
