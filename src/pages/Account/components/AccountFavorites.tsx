import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { removeFavoriteThunk } from '../../../store/slices/favoritesSlice.ts';
import MovieCard from '../../../components/Cards/MovieCard/MovieCard.tsx';
import styles from '../AccountPage.module.scss';
import { toast } from 'react-toastify';

const AccountFavorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.favorites);

  const handleRemoveFavorite = (movieId: number) => {
    dispatch(removeFavoriteThunk(movieId));
    toast.success('Фильм удален из избранного');
  };

  return (
    <section className="page">
      {favorites.length ? (
        <ul className={`${styles['favorites__list']} list-reset`}>
          {favorites.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              top={false}
              index={index}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </ul>
      ) : (
        <p>Список избранных фильмов пуст</p>
      )}
    </section>
  );
};

export default AccountFavorites;
