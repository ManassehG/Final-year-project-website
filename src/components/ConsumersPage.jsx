import React from 'react';
import Header from './Header';
import ConsumerCard from './ConsumerCard';
import './ConsumersPage.css';

const ConsumersPage = ({ toggleSidebar }) => {
  // Mock data for three consumers
  const consumersData = {
    consumer1: {
      voltage: 220.5,
      current: 1.2,
      activePower: 264.6,
      frequency: 50.1,
      powerFactor: 0.98,
      activeEnergy: 123.45,
    },
    consumer2: {
      voltage: 221.2,
      current: 0.8,
      activePower: 176.96,
      frequency: 50.0,
      powerFactor: 0.95,
      activeEnergy: 234.56,
    },

  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="consumers-page">
        <h1 className="page-title">Consumers</h1>
        <div className="consumers-grid">
          <ConsumerCard consumerName="Consumer 1" data={consumersData.consumer1} />
          <ConsumerCard consumerName="Consumer 2" data={consumersData.consumer2} />

        </div>
      </div>
    </>
  );
};

export default ConsumersPage;
