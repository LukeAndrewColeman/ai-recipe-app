'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [sessionState, setSessionState] = useState(null);

  const updateSession = useCallback((newSession) => {
    setSessionState(newSession);
  }, []);

  return (
    <AuthContext.Provider value={{ sessionState, updateSession }}>
      <SessionProvider>{children}</SessionProvider>
    </AuthContext.Provider>
  );
}
