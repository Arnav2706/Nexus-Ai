import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { SchedulePage } from './pages/SchedulePage';
import { NetworkPage } from './pages/NetworkPage';
import { InsightsPage } from './pages/InsightsPage';
import { MapPage } from './pages/MapPage';
import { MemoryPage } from './pages/MemoryPage';

import '@progress/kendo-theme-default/dist/all.css';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="network" element={<NetworkPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="memory" element={<MemoryPage />} />
          <Route path="settings" element={<div className="p-8">Settings coming soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
