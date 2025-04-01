import { useCallback, useEffect, useState } from 'react';

export const useFetchMovie = <T>(
  api: string
): { loading: boolean; data: T | null; error: boolean } => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://cinemaguide.skillbox.cc/${api}`);
      const result = await response.json();
      setData(result);
      setError(false);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setLoading(false);
      setError(true);
    }
  }, [api]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { loading, data, error };
};
