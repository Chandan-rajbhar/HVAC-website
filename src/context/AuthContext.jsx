import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ROLE_CONFIG = {
  customer: {
    label: 'Customer',
    homeRoute: '/buyers',
    allowedNavPaths: ['/', '/buyers', '/reservations', '/manage-contractor', '/my-system', '/help'],
    defaultCredentials: {
      name: 'Sarah Jenkins',
      email: 'customer@notechhvac.com',
      password: 'customer123',
    },
  },
  contractor: {
    label: 'Contractor',
    homeRoute: '/contractor',
    allowedNavPaths: ['/', '/contractor', '/contractor/jobs', '/contractor/schedule', '/reservations', '/manage-contractor', '/local-mechanical', '/help'],
    defaultCredentials: {
      name: 'David Vance',
      email: 'contractor@notechhvac.com',
      password: 'contractor123',
    },
  },
  investor: {
    label: 'Investor',
    homeRoute: '/investor',
    allowedNavPaths: ['/', '/investor', '/help'],
    defaultCredentials: {
      name: 'Marcus Sterling',
      email: 'investor@notechhvac.com',
      password: 'investor123',
    },
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('notech_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = ({ email, role = 'customer', name }) => {
    const cleanName = name?.trim() || email.split('@')[0] || 'User';
    const nextUser = { name: cleanName, email, role, avatar: null };
    setUser(nextUser);
    localStorage.setItem('notech_auth_user', JSON.stringify(nextUser));
    return nextUser;
  };

  const signup = ({ name, email, role = 'customer' }) => {
    const nextUser = { name: name.trim(), email, role, avatar: null };
    setUser(nextUser);
    localStorage.setItem('notech_auth_user', JSON.stringify(nextUser));
    return nextUser;
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const nextUser = { ...prev, ...updates };
      localStorage.setItem('notech_auth_user', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('notech_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
