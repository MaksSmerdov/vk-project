import { useState } from 'react';
import * as React from 'react';
import { FaHeart, FaSyncAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { RootState } from '../../store/store';
import { Movie } from '../../types/movie';
import Button from '../../ui/Button/Button';
import AuthModal from '../Auth/AuthModal';
import Rating from '../Rating/Rating';
import styles from './Intro.module.scss';

const Intro: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, data, error, refetch } = useFetchMovie<Movie>('movie/random');
  const user = useSelector((state: RootState) => state.auth.user);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatGenres = (genres: string[]): string => {
    return genres.join(', ');
  };

  const trailerOnClick = () => {
    window.open(`${data?.trailerUrl}`);
  };

  const refreshContent = () => {
    refetch();
  };

  const favoriteOnClick = () => {
    if (!user) {
      openModal();
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <div>Ошибка загрузки фильмов: {error}</div>;
  }

  return (
    <>
      <div className={`${styles['intro']}`}>
        <div className={`${styles['intro__left']}`}>
          <div className={`${styles['intro__genre']}`}>
            <Rating value={data.tmdbRating} />
            <span className={`${styles['intro__genre-span']}`}>{data.releaseYear}</span>
            <span className={`${styles['intro__genre-span']}`}>{formatGenres(data.genres)}</span>
            <span className={`${styles['intro__genre-span']}`}>{formatRuntime(data.runtime)}</span>
          </div>
          <h2 className={`page__title title-reset`}>{data.title}</h2>
          <p className={`${styles['intro__descr']} descr-reset`}>{data.plot}</p>
          <div className={`${styles['intro__btns']}`}>
            <div className={`${styles['intro__btns-top']}`}>
              <Button variant="primary" onClick={trailerOnClick}>
                Трейлер
              </Button>
            </div>
            <div className={`${styles['intro__btns-bottom']}`}>
              <Button variant="secondary">О фильме</Button>
              <Button variant="secondary" icon={<FaHeart />} onClick={favoriteOnClick} />
              <Button variant="secondary" icon={<FaSyncAlt />} onClick={refreshContent}></Button>
            </div>
          </div>
        </div>
        <div className={`${styles['intro__right']}`}>
          <img className={`${styles['intro__img']}`} src={data.backdropUrl} alt="intro" />
        </div>
      </div>
      {isOpen && <AuthModal onClose={closeModal} />}
    </>
  );
};

export default Intro;
