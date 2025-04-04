import { useCallback, useEffect, useState } from 'react';

export const useFetchMovie = <T>(
  api: string
): { loading: boolean; data: T | null; error: boolean; refetch: () => void } => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (!api) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://cinemaguide.skillbox.cc/${api}`);
      const result = await response.json();
      setData(result);
      setError(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    void fetchData();
  }, [fetchData]);

  return { loading, data, error, refetch };
};
