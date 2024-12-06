import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: apiUrl,
});

// register
export const signup = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', { 
      username: credentials.username,
      password: credentials.password,
    });

    console.log('Login response:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error during login:', error);
    throw error.response ? error.response.data : error.message;
  }
};