import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get('https://synk-job-portal.vercel.app/api/auth/current-user', { withCredentials: true });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password }, { withCredentials: true });
      setCurrentUser(response.data.user);
      navigate('/');  // Redirect to the home page after login
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, email, password }, { withCredentials: true });
      setCurrentUser(response.data.user);
      navigate('/');  // Redirect to the home page after registration
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
