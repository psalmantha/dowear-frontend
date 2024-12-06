import React, { createContext, useState, useContext } from 'react'
import { signup, login } from '../services/apiService'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleSignup = async (userData) => {
    const data = await signup(userData);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const handleLogin = async (credentials) => {
    const data = await login(credentials);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, handleSignup, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
