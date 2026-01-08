import React from 'react';
import './TransformerCard.css';

const TransformerCard = ({ name, currentLevel, isTheft }) => {
  const statusClass = isTheft ? 'status-theft' : 'status-normal';

  return (
    <div className="transformer-card">
      <div className="card-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <h3>{name}</h3>
      </div>
      <div className="current-level">
        {currentLevel.toFixed(2)} A
      </div>
      <div className="status">
        <div className={`status-icon ${statusClass}`}></div>
        <span>{isTheft ? 'Potential Theft Detected' : 'Normal'}</span>
      </div>
    </div>
  );
};

export default TransformerCard;
