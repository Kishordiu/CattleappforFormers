import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import HerdList from './pages/HerdList';
import AnimalProfile from './pages/AnimalProfile';
import DecisionIntelligence from './pages/DecisionIntelligence';
import WhatIfSimulation from './pages/WhatIfSimulation';
import Productivity from './pages/Productivity';
import Health from './pages/Health';
import Economics from './pages/Economics';
import Breeding from './pages/Breeding';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/herd" element={<HerdList />} />
          <Route path="/cattle/:id" element={<AnimalProfile />} />
          <Route path="/decisions" element={<DecisionIntelligence />} />
          <Route path="/what-if" element={<WhatIfSimulation />} />
          <Route path="/productivity" element={<Productivity />} />
          <Route path="/health" element={<Health />} />
          <Route path="/economics" element={<Economics />} />
          <Route path="/breeding" element={<Breeding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;