import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginRequest, fetchUserData } from '../services'; // Make sure to import loginRequest and fetchUserData
import Router from 'next/router';

// Create a context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to refresh authentication status
  const refreshAuth = async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setIsLoading(true);
      try {
        const data = await fetchUserData(token);
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.localStorage.removeItem('token');
        setUserInfo(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  // Function to handle login
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const data = await loginRequest(credentials);
      if (data && 'key' in data) {
        window.localStorage.setItem('token', data.key);
        await refreshAuth();
        Router.push('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle logout
  const logout = () => {
    window.localStorage.removeItem('token');
    setUserInfo(null);
    Router.push('/');
  };

  const contextValue = {
    userInfo,
    isLoading,
    login,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
