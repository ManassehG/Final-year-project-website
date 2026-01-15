import React from 'react';
import './AlertsPage.css';

const AlertsPage = ({ isTheft }) => {
  return (
    <div className="alerts-page">
      <div className={`alert-status ${isTheft ? 'theft-detected' : 'no-theft'}`}>
        {isTheft ? '1' : '0'}
      </div>
    </div>
  );
};

export default AlertsPage;
