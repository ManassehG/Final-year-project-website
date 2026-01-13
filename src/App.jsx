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
        const newData = {
          ...data,
          theftLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.201348389732!2d39.24222221477219!3d-6.771996995036898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b3f3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sUniversity%20of%20Dar%20es%20Salaam!5e0!3m2!1sen!2stz!4v1620208938994!5m2!1sen!2stz',
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
  const theftThreshold = 0.10 * mainTransformer.currentLevel;
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
