import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { removeFavoriteThunk } from '../../../store/slices/favoritesSlice.ts';
import MovieCard from '../../../components/Cards/MovieCard/MovieCard.tsx';
import styles from '../AccountPage.module.scss';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';

const AccountFavorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const isMobile = useMediaQuery({ query: '(max-width: 515px)' });

  const handleRemoveFavorite = (movieId: number) => {
    dispatch(removeFavoriteThunk(movieId));
    toast.success('Фильм удален из избранного');
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    variableWidth: true,
  };

  return (
    <section>
      {favorites.length ? (
        isMobile ? (
          <Slider {...sliderSettings} className={styles['favorites__list']}>
            {favorites.map((movie, index) => (
              // Оборачиваем слайд в div с нужным классом, для которого в CSS будет рассчитана ширина.
              <div key={movie.id} className={styles.slide}>
                <MovieCard
                  movie={movie}
                  top={false}
                  index={index}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              </div>
            ))}
          </Slider>
        ) : (
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
        )
      ) : (
        <p>Список избранных фильмов пуст</p>
      )}
    </section>
  );
};

export default AccountFavorites;
