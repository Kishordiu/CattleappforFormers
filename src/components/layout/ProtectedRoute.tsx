import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-ivory)]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[var(--color-forest)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[var(--color-charcoal-light)]">Loading Kangeyam Insight...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
