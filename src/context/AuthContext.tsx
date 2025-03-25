import React, { useState, createContext, useContext } from 'react';
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  return <AuthContext.Provider value={{
    isAuthenticated,
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);