import React from 'react';
import './Map.css';

const Map = ({ location }) => {
  return (
    <div className="map-container">
      <iframe
        src={location}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
