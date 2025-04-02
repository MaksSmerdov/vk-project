import { useEffect, useRef } from 'react';
import * as React from 'react';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { Movie } from '../../types/movie';
import styles from './BestFilms.module.scss';

const BestFilms: React.FC = () => {
  const { loading, data, error } = useFetchMovie<Movie[]>('movie/top10');
  const sliderRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add(styles['grabbing']);
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      slider.classList.remove(styles['grabbing']);
    };

    const onMouseUp = () => {
      isDown = false;
      slider.classList.remove(styles['grabbing']);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

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
