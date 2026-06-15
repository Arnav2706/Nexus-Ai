import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { SchedulePage } from './pages/SchedulePage';
import { NetworkPage } from './pages/NetworkPage';
import { InsightsPage } from './pages/InsightsPage';
import { MapPage } from './pages/MapPage';
import { MemoryPage } from './pages/MemoryPage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { CareerPage } from './pages/CareerPage';
import { PulseDashboard } from './pages/PulseDashboard';
import { WowFeatures } from './pages/WowFeatures';
import { SettingsPage } from './pages/SettingsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { AchievementsPage } from './pages/AchievementsPage';

import './index.css';

import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="network" element={<NetworkPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="memory" element={<MemoryPage />} />
            <Route path="graph" element={<KnowledgeGraphPage />} />
            <Route path="career" element={<CareerPage />} />
            <Route path="pulse" element={<PulseDashboard />} />
            <Route path="wow" element={<WowFeatures />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
