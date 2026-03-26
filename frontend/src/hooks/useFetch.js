import { useState, useEffect } from 'react';
import api from '../utils/api';

export function useFetch(endpoint, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(`[API] Fetching: ${api.defaults.baseURL}${endpoint}`);
      const res = await api.get(endpoint);
      console.log(`[API] Success ${endpoint}:`, res.data);
      setData(res.data.data ?? res.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load data';
      console.error(`[API] Error ${endpoint}:`, err.message, err.response?.status);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refetch(); }, deps);

  return { data, loading, error, refetch };
}
