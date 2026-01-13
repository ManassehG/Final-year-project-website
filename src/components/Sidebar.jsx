import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isTheft, theftLocation, isCollapsed, toggleSidebar }) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="mobile-close-btn" onClick={toggleSidebar}>×</button>
      <h1 className="sidebar-title">
        <Link to="/">{isCollapsed ? 'PG' : 'PowerGuard'}</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" className="active">
              <span className="icon">📊</span>
              {!isCollapsed && 'Dashboard'}
            </Link>
          </li>
          <li>
            <a href="#">
              <span className="icon">🔩</span>
              {!isCollapsed && 'Transformers'}
            </a>
          </li>
          <li>
            <Link to="/consumers">
              <span className="icon">👥</span>
              {!isCollapsed && 'Consumers'}
            </Link>
          </li>
          <li>
            <Link 
              to={isTheft ? "/alerts" : "#"}
              className={`sidebar-alert-link ${isTheft ? 'active' : 'disabled'}`}
            >
              <span className="icon">⚠️</span>
              {!isCollapsed && 'Alerts'}
              {!isCollapsed && isTheft && <span className="alert-indicator"></span>}
            </Link>
          </li>
          <li>
            <a href="#">
              <span className="icon">⚙️</span>
              {!isCollapsed && 'Settings'}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
