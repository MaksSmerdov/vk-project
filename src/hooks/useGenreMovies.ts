import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';

interface UseGenreMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  error: boolean;
  hasMore: boolean;
  loadNextPage: () => void;
}

export const useGenreMovies = (genre: string | undefined): UseGenreMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (!genre) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `https://cinemaguide.skillbox.cc/movie?count=10&page=${page}&genre=${genre}`
        );
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        const result: Movie[] = await response.json();

        // Первая страница — сортируем 10 фильмов
        if (page === 1) {
          result.sort((a, b) => b.tmdbRating - a.tmdbRating);
        }

        // Если на этой странице вернулось меньше 10 фильмов,
        // полагаем, что следующих страниц уже нет
        if (result.length < 10) {
          setHasMore(false);
        }

        setMovies((prev) => {
          // Мёрджим старые и новые
          const merged = [...prev, ...result];
          // Удаляем дубликаты (если сервер возвращает одинаковые фильмы)
          const uniqueMovies = merged.filter(
            (movie, idx, arr) => arr.findIndex((m) => m.id === movie.id) === idx
          );
          return uniqueMovies;
        });
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMovies();
  }, [page, genre]);

  const loadNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return {
    movies,
    isLoading,
    error,
    hasMore,
    loadNextPage,
  };
};
