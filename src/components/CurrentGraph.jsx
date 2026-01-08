import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './CurrentGraph.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CurrentGraph = ({ history }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E0E0E0',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(224, 224, 224, 0.1)',
        },
        ticks: {
          color: '#A0AEC0',
        },
      },
      y: {
        grid: {
          color: 'rgba(224, 224, 224, 0.1)',
        },
        ticks: {
          color: '#A0AEC0',
        },
        title: {
          display: true,
          text: 'Current (A)',
          color: '#A0AEC0',
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0.4,
      }
    }
  };

  useEffect(() => {
    if (history && history.length > 0) {
      const labels = history.map(d => new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      const mainData = history.map(d => d.mainTransformer.currentLevel);
      const consumer1Data = history.map(d => d.consumers?.consumer1?.currentLevel ?? 0);
      const consumer2Data = history.map(d => d.consumers?.consumer2?.currentLevel ?? 0);
      setChartData({
        labels,
        datasets: [
          {
            label: 'Main',
            data: mainData,
            borderColor: 'var(--primary-accent)',
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
            fill: true,
          },
          {
            label: 'Consumer 1',
            data: consumer1Data,
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            fill: true,
          },
          {
            label: 'Consumer 2',
            data: consumer2Data,
            borderColor: '#4BC0C0',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            fill: true,
          },
        ],
      });
    }
  }, [history]);

  return (
    <div className="current-graph">
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

export default CurrentGraph;
