import axios from 'axios';
import React, { createContext, useCallback, useEffect, useState } from 'react';

const OwnerContext = createContext();

const OwnerContextProvider = ({ children }) => {
  const [Otoken, setOtoken] = useState(() => 
    localStorage.getItem('ownerToken') || ''
  );
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const getOwnerDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching owner dashboard data...');
      const response = await axios.get(`${backendUrl}/api/owner/dashboard`, {
        headers: {
          'Authorization': `Bearer ${Otoken}`, 'Content-Type': 'application/json'
      }
      });
      
      console.log('Dashboard response:', response.data);
      
      if (response.data.success) {
        setStats(response.data.stats);
      } else {
        throw new Error(response.data.message || 'Invalid dashboard data');
      }
    } catch (err) {
      console.error('Dashboard fetch failed:', {
        message: err.message,
        response: err.response?.data
      });
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [Otoken, backendUrl]);

  // Auto-fetch when token changes
  useEffect(() => {
    if (Otoken) {
      getOwnerDashboard();
    }
  }, [Otoken, getOwnerDashboard]);

  // Manage token in localStorage
  useEffect(() => {
    if (Otoken) {
      localStorage.setItem('ownerToken', Otoken);
    } else {
      localStorage.removeItem('ownerToken');
    }
  }, [Otoken]);

  return (
    <OwnerContext.Provider
      value={{
        Otoken,
        setOtoken,
        stats,
        loading,
        error,
        getOwnerDashboard,
        backendUrl
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};

export { OwnerContext, OwnerContextProvider };
export default OwnerContextProvider;