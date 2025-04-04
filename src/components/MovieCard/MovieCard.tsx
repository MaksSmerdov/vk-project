import React from 'react';
import { NavLink } from 'react-router-dom';
import { Movie } from '../../types/movie';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  top?: boolean;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, top = true, index = 1 }) => {
  return (
    <li key={movie.id} className={`${styles['movie-card__item']} list-reset`}>
      <NavLink to={`/movie/${movie.id}`} className={styles['movie-card__link']}>
        {top && <div className={styles['movie-card__rank']}>{index + 1}</div>}
        <img
          className={styles['movie-card__link-img']}
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
        />
      </NavLink>
    </li>
  );
};

export default MovieCard;
