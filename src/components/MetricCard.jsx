import React from 'react';
import './MetricCard.css';

// A simple icon component for demonstration
const Icon = ({ type }) => {
  switch (type) {
    case 'bolt':
      return <span className="icon bolt-icon">⚡</span>;
    case 'graph':
      return <span className="icon graph-icon">📈</span>;
    case 'alert':
      return <span className="icon alert-icon">⚠️</span>;
    case 'status':
      return <span className="icon status-icon"></span>;
    default:
      return null;
  }
};

function MetricCard({ title, value, context, icon }) {
  return (
    <div className={`metric-card icon-${icon}`}>
      <div className="card-header">
        <h4 className="card-title">{title}</h4>
        <Icon type={icon} />
      </div>
      <div className="card-value">{value}</div>
      <p className="card-context">{context}</p>
    </div>
  );
}

export default MetricCard;
