import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1>Welcome to the Energy Grid Monitor</h1>
        <p>Monitor your energy consumption in real-time.</p>
        <Link to="/dashboard" className="launch-button">Launch App</Link>
      </div>
    </div>
  );
};

export default HomePage;
