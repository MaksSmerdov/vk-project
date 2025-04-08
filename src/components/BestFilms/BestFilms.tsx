import * as React from 'react';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { Movie } from '../../types/movie';
import MovieCard from '../Cards/MovieCard/MovieCard';
import styles from './BestFilms.module.scss';

const BestFilms: React.FC = () => {
  const { loading, data, error } = useFetchMovie<Movie[]>('movie/top10');
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <div>Ошибка загрузки фильмов: {error}</div>;
  }

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
    <div className={styles['best-films']}>
      <h2 className="page__subtitle title-reset">Топ 10 фильмов</h2>
      {isMobile ? (
        <Slider {...sliderSettings} className={styles['best-films__list']}>
          {data.map((movie, index) => (
            <div className={styles.slide} key={movie.id}>
              <MovieCard movie={movie} index={index} />
            </div>
          ))}
        </Slider>
      ) : (
        <ul className={`${styles['best-films__list']} list-reset`}>
          {data.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BestFilms;
