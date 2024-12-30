'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/app/auth';

// Custom hook to handle authentication state
export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await auth();
        setSession(session);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { session, loading, error };
}
