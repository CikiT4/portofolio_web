import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import PublicPortfolio from './pages/PublicPortfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CursorGlow from './components/CursorGlow';

function ProtectedRoute({ children }) {
  const { token, user } = useAuth();
  if (!token) return <Navigate to="/admin/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CursorGlow />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: '#1F1F1F', color: '#E8E8E8', border: '1px solid #2A2A2A', fontFamily: '"DM Sans", sans-serif', fontSize: '14px' },
            success: { iconTheme: { primary: '#C9A84C', secondary: '#080808' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#080808' } },
          }}
        />
        <Routes>
          <Route path="/" element={<PublicPortfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
