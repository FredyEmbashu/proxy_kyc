import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const useApi = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleError = (error: any) => {
    if (error.response?.status === 401) {
      logout();
    }
    throw error;
  };

  const get = async (url: string) => {
    setLoading(true);
    try {
      const response = await api.get(url);
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const post = async (url: string, data: any) => {
    setLoading(true);
    try {
      const response = await api.post(url, data);
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const put = async (url: string, data: any) => {
    setLoading(true);
    try {
      const response = await api.put(url, data);
      return response;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    get,
    post,
    put,
    loading
  };
};