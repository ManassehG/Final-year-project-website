import React, { useState } from 'react';
import Header from './Header';
import Map from './Map';
import './AlertsPage.css';

const AlertsPage = ({ isTheft, theftLocation, externalMapUrl, transformer, toggleSidebar }) => {
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
          </div>
        ) : (
          <div className="no-alerts">
            <p>No active alerts. System is operating normally.</p>
          </div>
        )}
        
        <div className="location-section" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn-location" onClick={() => setShowMap(!showMap)}>
              {showMap ? 'Hide Monitored Location' : 'Show Monitored Location'}
            </button>
            {externalMapUrl && (
              <a 
                href={externalMapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-location"
                style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
              >
                Open in Google Maps ↗
              </a>
            )}
          </div>
          {showMap && <Map location={theftLocation} />}
        </div>
      </div>
    </>
  );
};

export default AlertsPage;
