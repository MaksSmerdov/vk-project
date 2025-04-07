import React from 'react';
import { NavLink } from 'react-router-dom';
import { Movie } from '../../../types/movie';
import { FaTimes } from 'react-icons/fa';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  top?: boolean;
  index?: number;
  onRemoveFavorite?: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  top = true,
  index = 1,
  onRemoveFavorite,
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemoveFavorite) {
      onRemoveFavorite(movie.id);
    }
  };

  return (
    <li key={movie.id} className={`${styles['movie-card__item']} list-reset`}>
      <NavLink to={`/movie/${movie.id}`} className={styles['movie-card__link']}>
        {top && <div className={styles['movie-card__rank']}>{index + 1}</div>}
        {!top && onRemoveFavorite && (
          <button className={`${styles['movie-card__remove']} btn-reset`} onClick={handleRemove}>
            <FaTimes />
          </button>
        )}
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
