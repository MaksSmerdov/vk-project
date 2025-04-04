import React from 'react';
import { Movie } from '../../types/movie';
import styles from './MovieDescription.module.scss';

interface MovieDescriptionProps {
  movie: Movie;
}

const MovieDescription: React.FC<MovieDescriptionProps> = ({ movie }) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU'); // Используем русскую локаль для разделения пробелами
  };

  const details = [
    { label: 'Язык оригинала', value: movie.language },
    {
      label: 'Бюджет',
      value: movie.budget != null ? `${formatNumber(Number(movie.budget))} руб.` : null,
    },
    {
      label: 'Выручка',
      value: movie.revenue != null ? `${formatNumber(Number(movie.revenue))} руб.` : null,
    },
    { label: 'Режиссёр', value: movie.director },
    { label: 'Продакшен', value: movie.production },
    { label: 'Награды', value: movie.awardsSummary },
  ];

  return (
    <section className="page">
      <h2 className="page__subtitle title-reset">О фильме</h2>
      <div className={`${styles['movie-description__details']}`}>
        {details.map((detail, index) => (
          <div key={index} className={`${styles['movie-description__row']}`}>
            <span className={`${styles['movie-description__label']}`}>{detail.label}</span>
            <span className={`${styles['movie-description__dots']}`}></span>
            <span className={`${styles['movie-description__value']}`}>
              {detail.value != null ? detail.value : 'Нет данных'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieDescription;
