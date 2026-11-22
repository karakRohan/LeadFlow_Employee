// import { createContext, useContext, useEffect, useState } from 'react';
// import api from '../api/client';
// const AuthContext = createContext(null);
// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => { const token = localStorage.getItem('leadflow_token'); if (!token) { setLoading(false); return; } api.get('/auth/me').then(r => setUser(r.data.user)).catch(() => localStorage.removeItem('leadflow_token')).finally(() => setLoading(false)); }, []);
//   const authenticate = async (path, payload) => { const { data } = await api.post(`/auth/${path}`, payload); localStorage.setItem('leadflow_token', data.token); setUser(data.user); return data.user; };
//   const logout = () => { localStorage.removeItem('leadflow_token'); setUser(null); };
//   return <AuthContext.Provider value={{ user, loading, login: p => authenticate('login', p), signup: p => authenticate('signup', p), logout }}>{children}</AuthContext.Provider>;
// }
// export const useAuth = () => useContext(AuthContext);



import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing authentication on app load
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('leadflow_token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/me');
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem('leadflow_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // Login and Signup
  const authenticate = async (path, payload) => {
    try {
      const { data } = await api.post(`/auth/${path}`, payload);

      localStorage.setItem('leadflow_token', data.token);
      setUser(data.user);

      return data.user;
    } catch (error) {
      throw error;
    }
  };

  // Login
  const login = (payload) => authenticate('login', payload);

  // Signup
  const signup = (payload) => authenticate('signup', payload);

  // Logout
  const logout = () => {
    localStorage.removeItem('leadflow_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom authentication hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
