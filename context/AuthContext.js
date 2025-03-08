'use client';

import { createContext, useState, useEffect } from 'react';
import { account } from '@/config/appwrite';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the logged-in user
  const getUser = async () => {
    try {
      setLoading(true);
      const response = await account.get();
      setUser(response);
      return response;
    } catch (error) {
      // This is expected for guests, so we shouldn't treat it as a critical error
      if (error.code === 401 || error.message?.includes('missing scope')) {
        console.log('No active session, user not logged in');
      } else {
        console.error('Error fetching user:', error);
      }
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(); // Check for existing session on mount
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const session = await account.createEmailPasswordSession(email, password);
      const userData = await getUser(); // Refresh user after login
      return { success: true, session, user: userData };
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await account.deleteSession('current');
      setUser(null); // Immediately clear user
      return { success: true };
    } catch (error) {
      console.error('Error logging out:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser: getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
