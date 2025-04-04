import React from 'react';
import styles from './GenreCard.module.scss';
import { capitalizeFirstLetter } from '../../utils/utilsFunctions';

interface GenreCardProps {
  genre: string;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  return (
    <li key={genre} className={`${styles['genres__item']} list-reset`}>
      <a className={styles['genres__link']}>
        <img
          className={styles['genres__link-img']}
          src={`/images/genre_${genre}.png`}
          alt={genre}
        />
        <div className={styles['genres__link-div']}>{capitalizeFirstLetter(genre)}</div>
      </a>
    </li>
  );
};

export default GenreCard;
