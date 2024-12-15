import React, { createContext, useState, useContext, useEffect } from 'react'
import { signup, login } from '../services/apiService'
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const fetchSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
  
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/getUserProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.error('Error fetching session:', error);

      if (error.response?.status === 401) {
        alert('Your session has expired. Please log in again.');
      }
      
      setUser(null);
    }
  };
  
  
  useEffect(() => {
    if(token)fetchSession();
  }, [token]);

  const handleSignup = async (userData) => {
    const data = await signup(userData);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const handleLogin = async (credentials) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        credentials
      );
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`);
      setUser(null);
      setToken(null);
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, handleSignup, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

// export const useAuth = () => useContext(AuthContext);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
export { useAuth };