import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import MetricCard from './MetricCard';
import CurrentGraph from './CurrentGraph';
import './Dashboard.css';

const Dashboard = ({ gridData, history, isTheft, toggleSidebar }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { mainTransformer, consumers, theftLocation } = gridData;

  console.log({ isTheft, theftLocation });

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="dashboard-grid">
        <MetricCard title="Total Current" value={`${mainTransformer.currentLevel.toFixed(2)} A`} context="Across all transformers" icon="bolt" />
        <MetricCard title="Consumer 1" value={`${consumers?.consumer1?.currentLevel.toFixed(2) ?? '0.00'} A`} context="Load" icon="graph" />
        <MetricCard title="Consumer 2" value={`${consumers?.consumer2?.currentLevel.toFixed(2) ?? '0.00'} A`} context="Load" icon="graph" />
        <Link to="/alerts" className="alert-link">
          <MetricCard title="Active Alerts" value={isTheft ? '1' : '0'} context={isTheft ? "Theft Detected" : "All clear"} icon="alert" />
        </Link>
      </div>
      <div className="charts-grid">
        <div className="chart-container">
          <h3>⚡ Real-Time Current Flow</h3>
          <CurrentGraph history={history} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

