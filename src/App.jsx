// src/App.js
import React, { useState, useEffect } from 'react';
import FeedbackList from './components/FeedbackList';
import FilteringComponent from './components/FilteringComponent';
import './styles.css';

const App = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) throw new Error('Failed to fetch feedback');
        const data = await response.json();
        const formattedFeedbacks = data.map(feedback => ({
          id: feedback.id,
          name: feedback.name,
          body: feedback.body,
          createdAt: new Date().toISOString(), // Set the createdAt as current time
          responseStatus: 'Unacknowledged',
          updatedAt: null,
          responseComment: ''
        }));
        setFeedbacks(formattedFeedbacks);
        setFilteredFeedbacks(formattedFeedbacks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleFilter = (filtered) => {
    setFilteredFeedbacks(filtered);
  };

  const handleResponseUpdate = (id, responseStatus, responseComment) => {
    const updatedTime = new Date().toISOString(); // Get current time
  
    setFeedbacks(prevFeedbacks => {
      return prevFeedbacks.map(feedback => {
        if (feedback.id === id) {
          return { 
            ...feedback, 
            responseStatus, 
            responseComment, 
            updatedAt: updatedTime // Set updated time
          };
        }
        return feedback;
      }).sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)); // Sort by updated or created time
    });
  
    // Update the filtered feedbacks
    setFilteredFeedbacks(prevFeedbacks => {
      return prevFeedbacks.map(feedback => {
        if (feedback.id === id) {
          return { 
            ...feedback, 
            responseStatus, 
            responseComment, 
            updatedAt: updatedTime // Set updated time
          };
        }
        return feedback;
      }).sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
    });
  };
  

  return (
    <div className="app">
      <h1>Customer Feedback Management</h1>
      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <>
          <FilteringComponent onFilter={handleFilter} feedbacks={feedbacks} />
          <FeedbackList 
            feedbacks={filteredFeedbacks} 
            onResponseUpdate={handleResponseUpdate}
          />
        </>
      )}
    </div>
  );
};

export default App;
