import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import LandingPage from './Pages/LandingPage';
import PlansPage from './Pages/PlansPage';
import { useAuthSync } from './hooks/useAuthSync';

const App = () => {
   useAuthSync();
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
};

export default App;