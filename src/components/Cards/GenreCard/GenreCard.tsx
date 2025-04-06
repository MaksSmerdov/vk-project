import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './GenreCard.module.scss';
import { capitalizeFirstLetter } from '../../utils/utilsFunctions';

interface GenreCardProps {
  genre: string;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  return (
    <li key={genre} className={`${styles['genres__item']} list-reset`}>
      <NavLink to={`/genres/${genre}`} className={styles['genres__link']}>
        <img
          className={styles['genres__link-img']}
          src={`/images/genre_${genre}.png`}
          alt={genre}
          loading="lazy"
        />
        <div className={styles['genres__link-div']}>{capitalizeFirstLetter(genre)}</div>
      </NavLink>
    </li>
  );
};

export default GenreCard;
