// src/components/FilteringComponent.js
import React, { useState } from 'react';

const FilteringComponent = ({ onFilter, feedbacks }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('All');

  const handleFilter = () => {
    const filtered = feedbacks.filter(feedback => {
      const feedbackDate = new Date(feedback.createdAt);
      const isWithinDateRange = (!startDate || feedbackDate >= new Date(startDate)) &&
                                (!endDate || feedbackDate <= new Date(endDate));
      const isMatchingStatus = status === 'All' || feedback.responseStatus === status;
      return isWithinDateRange && isMatchingStatus;
    });
    onFilter(filtered);
  };

  return (
    <div className="filtering-component">
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div>
        <label>Filter by Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Acknowledged">Acknowledged</option>
          <option value="Addressed">Addressed</option>
          <option value="Ignored">Ignored</option>
        </select>
      </div>
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default FilteringComponent;
