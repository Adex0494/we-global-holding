'use client';

import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { API_ROUTES } from '@/lib/constants';

export type Role = 'ADMIN' | 'USER';

export interface Session {
  userId: string;
  email: string;
  role: Role;
}

interface SessionContextValue {
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

interface SessionProviderProps {
  children: ReactNode;
  initialSession: Session | null;
}

export function SessionProvider({ children, initialSession }: SessionProviderProps) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [isLoading, setIsLoading] = useState(false);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_ROUTES.SESSION, { credentials: 'include' });
      const data = await res.json();
      if (data.ok && data.session) {
        setSession(data.session);
      } else {
        setSession(null);
      }
    } catch {
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSession = useCallback(() => {
    setSession(null);
  }, []);

  const value = useMemo(() => ({
    session,
    isAuthenticated: session !== null,
    isAdmin: session?.role === 'ADMIN',
    isLoading,
    refreshSession,
    clearSession,
  }), [session, isLoading, refreshSession, clearSession]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
