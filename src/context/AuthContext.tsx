import React, { useState, createContext, useContext, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updatePassword: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAuthenticated');
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    // In a real application, this would make an API call to update the password
    // For demo purposes, we'll just simulate a successful update
    if (currentPassword === 'abirsabir') {
      // Store the new password in localStorage (in a real app, this would be handled by the backend)
      localStorage.setItem('adminPassword', newPassword);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Current password is incorrect'));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);