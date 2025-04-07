import * as React from 'react';
import { useState } from 'react';
import { FaHeart, FaSyncAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { RootState } from '../../store/store';
import { Movie } from '../../types/movie';
import Button from '../../ui/Button/Button';
import Rating from '../../ui/Rating/Rating';
import { formatRuntime } from '../../utils/utilsFunctions';
import AuthModal from '../Auth/AuthModal';
import styles from './Intro.module.scss';

interface IntroProps {
  api?: string;
  homepage?: boolean;
}

const Intro: React.FC<IntroProps> = ({ api = 'random', homepage = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, data, error, refetch } = useFetchMovie<Movie>(`movie/${api}`);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

  // Если данные ещё не загружены
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
              {homepage && (
                <Button variant="secondary" onClick={() => navigate(`/movie/${data.id}`)}>
                  О фильме
                </Button>
              )}
              <Button variant="secondary" icon={<FaHeart />} onClick={favoriteOnClick} />
              {homepage && (
                <Button variant="secondary" icon={<FaSyncAlt />} onClick={refreshContent} />
              )}
            </div>
          </div>
        </div>
        <div className={`${styles['intro__right']}`}>
          <img
            className={`${styles['intro__img']}`}
            src={data.backdropUrl}
            alt="intro"
            loading="lazy"
          />
        </div>
      </div>
      {isOpen && <AuthModal onClose={closeModal} />}
    </>
  );
};

export default Intro;
