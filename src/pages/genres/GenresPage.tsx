import React from 'react';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import styles from './GenresPage.module.scss';

const GenresPage: React.FC = () => {
  const { loading, data, error } = useFetchMovie<[]>('movie/genres');

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  return (
    <section className="page">
      <h2 className="page__title title-reset">Жанры фильмов</h2>
      <ul className={`${styles['genres__list']} list-reset`}>
        {data.map((genre) => (
          <li className={`${styles['genres__item']} list-reset`}>
            <a className={styles['genres__link']}>
              <img
                className={styles['genres__link-img']}
                src={`/images/genre_${genre}.png`}
                alt={genre}
              />
              <div className={styles['genres__div']}>{genre}</div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GenresPage;
