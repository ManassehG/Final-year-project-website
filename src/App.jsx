import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ConsumersPage from './components/ConsumersPage';
import HomePage from './components/HomePage';
import AlertsPage from './components/AlertsPage';
import './App.css';

function App() {
  const [gridData, setGridData] = useState({
    mainTransformer: { currentLevel: 0 },
    consumers: {},
    theftLocation: '',
  });
  const [history, setHistory] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    const gridDataRef = ref(db, '/gridData');

    const unsubscribe = onValue(gridDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lat = data.location?.lat;
        const lon = data.location?.lon;
        
        const mapUrl = lat && lon 
          ? `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`
          : '';
          
        const externalMapUrl = lat && lon 
          ? `https://www.google.com/maps?q=${lat},${lon}`
          : '';

        const newData = {
          ...data,
          theftLocation: mapUrl,
          externalMapUrl: externalMapUrl,
        };
        setGridData(newData);
        setHistory(prevHistory => [...prevHistory, { ...newData, timestamp: new Date().getTime() }].slice(-30));
      }
    });

    return () => unsubscribe();
  }, []);

  const { mainTransformer, consumers, theftLocation } = gridData;
  const consumerArray = consumers ? Object.values(consumers) : [];
  const totalConsumerCurrent = consumerArray.reduce((acc, consumer) => acc + (consumer.currentLevel || 0), 0);
  const currentDifference = mainTransformer.currentLevel - totalConsumerCurrent;
  const theftThreshold = 0.15 * mainTransformer.currentLevel;
  const isTheft = currentDifference > theftThreshold;

  return (
    <div className={`app-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {!isSidebarCollapsed && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <Sidebar 
        isTheft={isTheft} 
        theftLocation={theftLocation} 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <Dashboard
              gridData={gridData}
              history={history}
              isTheft={isTheft}
              toggleSidebar={toggleSidebar}
            />
          } />
          <Route path="/consumers" element={<ConsumersPage toggleSidebar={toggleSidebar} />} />
          <Route path="/alerts" element={
            <AlertsPage 
              isTheft={isTheft} 
              theftLocation={theftLocation} 
              externalMapUrl={gridData.externalMapUrl}
              transformer={mainTransformer}
              toggleSidebar={toggleSidebar}
            />
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
