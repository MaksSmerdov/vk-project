import * as React from 'react';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { Movie } from '../../types/movie';
import styles from './BestFilms.module.scss';

const BestFilms: React.FC = () => {
  const { loading, data, error } = useFetchMovie<Movie[]>('movie/top10');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <div>Ошибка загрузки фильмов: {error}</div>;
  }

  return (
    <div className={styles['best-films']}>
      <h2 className={`${styles['best-films__title']} title-reset`}>Топ 10 фильмов</h2>
      <ul className={`${styles['best-films__list']} list-reset`}>
        {data.map((movie, index) => (
          <li key={movie.id} className={`${styles['best-films__item']} list-reset`}>
            <a className={styles['best-films__link']}>
              <div className={styles['best-films__rank']}>{index + 1}</div>
              <img
                className={styles['best-films__link-img']}
                src={movie.posterUrl}
                alt={movie.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = movie.backdropUrl;
                }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestFilms;
