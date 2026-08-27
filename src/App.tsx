import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HerdList from './pages/HerdList';
import AnimalProfile from './pages/AnimalProfile';
import DecisionIntelligence from './pages/DecisionIntelligence';
import WhatIfSimulation from './pages/WhatIfSimulation';
import Productivity from './pages/Productivity';
import Health from './pages/Health';
import Economics from './pages/Economics';
import Breeding from './pages/Breeding';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes — requires auth */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
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

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;