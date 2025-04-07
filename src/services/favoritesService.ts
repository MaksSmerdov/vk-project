import { Movie } from '../types/movie';

// Получение списка избранных фильмов
export const getFavorites = async (): Promise<Movie[]> => {
  const response = await fetch('https://cinemaguide.skillbox.cc/favorites', {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Ошибка при получении избранных фильмов');
  }
  return await response.json();
};

// Добавление фильма в избранное
export const addFavorite = async (movieId: number): Promise<Movie> => {
  const response = await fetch('https://cinemaguide.skillbox.cc/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ id: String(movieId) }),
  });
  if (!response.ok) {
    throw new Error('Ошибка при добавлении фильма в избранное');
  }
  return await response.json();
};

// Удаление фильма из избранного
export const removeFavorite = async (movieId: number): Promise<number> => {
  const response = await fetch(`https://cinemaguide.skillbox.cc/favorites/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Ошибка при удалении фильма из избранного');
  }
  return movieId;
};
