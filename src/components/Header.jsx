import React, { useState, useEffect } from 'react';
import './Header.css';

function Header({ toggleSidebar }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="header-title">
          <span role="img" aria-label="lightning">⚡</span> Power Theft Detection System
        </div>
      </div>
      <div className="header-status">
        <span className="status-indicator"></span>
        ONLINE {formattedTime}
      </div>
    </header>
  );
}

export default Header;