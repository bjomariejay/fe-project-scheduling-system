'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from '@/views/LoginPage';
import WorkspacePage from '@/views/WorkspacePage';

export default function HomePage() {
  const { isAuthenticated, sessionInitialized } = useAuth();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('workspace-mode', isAuthenticated);
    return () => {
      root.classList.remove('workspace-mode');
    };
  }, [isAuthenticated]);

  if (!sessionInitialized) {
    return null;
  }

  return isAuthenticated ? <WorkspacePage /> : <LoginPage />;
}
