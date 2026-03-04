import { useState } from 'react';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (fn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fn(...args);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Erro na conexão");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}