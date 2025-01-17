'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSession } from '@/app/actions/getSession';
import { useAuthContext } from '@/app/providers/AuthProvider';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { sessionState, updateSession } = useAuthContext();

  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
      const sessionData = await getSession();
      updateSession(sessionData);
      return sessionData;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [updateSession]);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  return {
    session: sessionState,
    loading,
    error,
    refreshSession,
  };
}
