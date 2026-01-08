import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import './ConsumerCard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ConsumerCard = ({ consumerName, data }) => {
  const {
    voltage,
    current,
    activePower,
    frequency,
    powerFactor,
    activeEnergy,
  } = data;

  const powerFactorData = {
    labels: ['Power Factor', ''],
    datasets: [
      {
        data: [powerFactor, 1 - powerFactor],
        backgroundColor: ['#4CAF50', '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  const activePowerData = {
    labels: ['Active Power'],
    datasets: [
      {
        label: 'Watts',
        data: [activePower],
        backgroundColor: '#2196F3',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="consumer-card">
      <div className="card-header">
        <h4 className="card-title">{consumerName}</h4>
      </div>
      <div className="card-body">
        <div className="chart-container">
          <div className="doughnut-chart">
            <Doughnut data={powerFactorData} options={{ ...options, cutout: '80%' }} />
            <div className="chart-center-text">{powerFactor?.toFixed(2)}</div>
          </div>
          <div className="bar-chart">
            <Bar data={activePowerData} options={options} />
          </div>
        </div>
        <div className="metrics-grid">
          <div className="metric">
            <span className="metric-icon">⚡</span>
            <div className="metric-content">
              <span className="metric-label">Voltage:</span>
              <span className="metric-value">{voltage?.toFixed(2) ?? '0.00'} V</span>
            </div>
          </div>
          <div className="metric">
            <span className="metric-icon">🔌</span>
            <div className="metric-content">
              <span className="metric-label">Current:</span>
              <span className="metric-value">{current?.toFixed(2) ?? '0.00'} A</span>
            </div>
          </div>
          <div className="metric">
            <span className="metric-icon">🔄</span>
            <div className="metric-content">
              <span className="metric-label">Frequency:</span>
              <span className="metric-value">{frequency?.toFixed(2) ?? '0.00'} Hz</span>
            </div>
          </div>
          <div className="metric">
            <span className="metric-icon">💡</span>
            <div className="metric-content">
              <span className="metric-label">Energy:</span>
              <span className="metric-value">{activeEnergy?.toFixed(2) ?? '0.00'} kWh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerCard;
