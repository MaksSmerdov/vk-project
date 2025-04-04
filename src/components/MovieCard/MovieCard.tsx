import React from 'react';
import { Movie } from '../../types/movie';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  top?: boolean;
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, top = true, index }) => {
  return (
    <li key={movie.id} className={`${styles['movie-card__item']} list-reset`}>
      <a className={styles['movie-card__link']}>
        {top && <div className={styles['movie-card__rank']}>{index + 1}</div>}
        <img className={styles['movie-card__link-img']} src={movie.posterUrl} alt={movie.title} />
      </a>
    </li>
  );
};

export default MovieCard;
