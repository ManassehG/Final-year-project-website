import React, { useState } from 'react';
import Header from './Header';
import Map from './Map';
import './AlertsPage.css';

const AlertsPage = ({ isTheft, theftLocation, transformer, toggleSidebar }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="alerts-page">
        <h1 className="page-title">Alerts</h1>
      {isTheft ? (
        <div className="alert-card">
          <div className="alert-header">
            <h2>Power Theft Detected!</h2>
            <p>Abnormal power usage detected at the following transformer:</p>
          </div>
          <div className="transformer-info">
            <h3>Transformer Details</h3>
            <p><strong>ID:</strong> {transformer.id || 'T-Main-001'}</p>
            <p><strong>Current Level:</strong> {transformer.currentLevel?.toFixed(2)} A</p>
            {/* Add other relevant transformer details here */}
          </div>
          <button className="btn-location" onClick={() => setShowMap(!showMap)}>
            {showMap ? 'Hide Location' : 'Show Location'}
          </button>
          {showMap && <Map location={theftLocation} />}
        </div>
      ) : (
        <div className="no-alerts">
          <p>No active alerts.</p>
        </div>
      )}
    </div>
    </>
  );
};

export default AlertsPage;
