'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type AuthCtx = {
  user: User | null;
  loading: boolean;
  authOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  user: null, loading: true, authOpen: false,
  openAuth: () => {}, closeAuth: () => {}, signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) setAuthOpen(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{
      user, loading, authOpen,
      openAuth: () => setAuthOpen(true),
      closeAuth: () => setAuthOpen(false),
      signOut: () => fbSignOut(auth),
    }}>
      {children}
    </AuthContext.Provider>
  );
}
