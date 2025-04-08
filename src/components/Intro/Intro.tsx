import * as React from 'react';
import { useState } from 'react';
import { FaHeart, FaSyncAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { addFavoriteThunk } from '../../store/slices/favoritesSlice';
import { RootState } from '../../store/store';
import { Movie } from '../../types/movie';
import Button from '../../ui/Button/Button';
import Rating from '../../ui/Rating/Rating';
import { formatRuntime } from '../../utils/utilsFunctions';
import AuthModal from '../Auth/AuthModal';
import styles from './Intro.module.scss';
import { toast } from 'react-toastify';
import { fetchProfile } from '../../store/slices/authSlice.ts';
import VideoModal from '../../ui/VideoPlayer/VideoPlayer.tsx';

interface IntroProps {
  api?: string;
  homepage?: boolean;
}

const Intro: React.FC<IntroProps> = ({ api = 'random', homepage = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [video, setVideo] = useState(false);
  const { loading, data, error, refetch } = useFetchMovie<Movie>(`movie/${api}`);
  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formatGenres = (genres: string[]): string => {
    return genres.join(', ');
  };

  const openVideo = () => {
    setVideo(true);
  };

  const closeVideo = () => {
    setVideo(false);
  };

  const refreshContent = () => {
    refetch();
  };

  const isFavorite = data ? favorites.some((movie) => movie.id === data.id) : false;

  const favoriteOnClick = () => {
    if (!user) {
      openModal();
    } else if (data) {
      if (!isFavorite) {
        dispatch(addFavoriteThunk(data));
        toast.success('Фильм добавлен в избранное.');
        dispatch(fetchProfile());
      } else {
        toast.error('Фильм уже в избранном.');
      }
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
            {homepage ? (
              <>
                <div className={`${styles['intro__btns-top']}`}>
                  <Button variant="primary" onClick={openVideo}>
                    Трейлер
                  </Button>
                </div>
                <div className={`${styles['intro__btns-bottom']}`}>
                  <Button variant="secondary" onClick={() => navigate(`/movie/${data.id}`)}>
                    О фильме
                  </Button>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <Button
                      variant="secondary"
                      icon={<FaHeart color={isFavorite ? '#B4A9FF' : 'inherit'} />}
                      onClick={favoriteOnClick}
                    />
                    <Button variant="secondary" icon={<FaSyncAlt />} onClick={refreshContent} />
                  </div>
                </div>
              </>
            ) : (
              <div className={`${styles['intro__btns-row']}`}>
                <div className={`${styles['intro__btns-row--trailer']}`}>
                  <Button variant="primary" onClick={openVideo} style={{ maxWidth: '171px' }}>
                    Трейлер
                  </Button>
                </div>
                <div className={`${styles['intro__btns-row--favorite']}`}>
                  <Button
                    variant="secondary"
                    icon={<FaHeart color={isFavorite ? '#B4A9FF' : 'inherit'} />}
                    onClick={favoriteOnClick}
                    style={{ maxWidth: '68px' }}
                  />
                </div>
              </div>
            )}
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
      {video && <VideoModal onClose={closeVideo} videoTitle={data.title} />}
    </>
  );
};

export default Intro;
