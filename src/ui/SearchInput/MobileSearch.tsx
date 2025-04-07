import React, { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { Movie } from '../../types/movie';
import Rating from '../Rating/Rating';
import styles from './SearchInput.module.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface MobileSearchProps {
  onClose: () => void;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const {
    loading,
    data: movies,
    error,
  } = useFetchMovie<Movie[]>(
    debouncedSearchTerm ? `movie?title=${encodeURIComponent(debouncedSearchTerm)}` : ''
  );

  useEffect(() => {
    if (!loading && !error && movies && movies.length > 0 && searchTerm.trim() !== '') {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [loading, error, movies, searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectMovie = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    setIsDropdownOpen(false);
    onClose();
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    <div className={`${styles['mobile-search__overlay']}`}>
      <div className={`${styles['mobile-search__content']}`}>
        <div className={`${styles['mobile-search__header']}`}>
          <FiSearch className={`${styles['mobile-search__icon']}`} />
          <input
            type="text"
            placeholder="Поиск"
            className={`${styles['mobile-search__field']}`}
            value={searchTerm}
            onChange={handleChange}
            autoFocus
          />
          <button
            type="button"
            className={`${styles['mobile-search__close-btn']} btn-reset`}
            onClick={onClose}>
            <FiX />
          </button>
        </div>
        {isDropdownOpen && !loading && !error && movies && movies.length > 0 && (
          <Slider {...sliderSettings} className={`${styles['mobile-search__dropdown']}`}>
            {movies.map((movie) => (
              <div
                key={movie.id}
                className={`${styles['mobile-search__dropdown-item']}`}
                onClick={() => handleSelectMovie(movie.id)}>
                <img
                  className={`${styles['mobile-search__dropdown-item-poster']}`}
                  src={movie.posterUrl}
                  alt={movie.title}
                />
                <div className={`${styles['mobile-search__dropdown-item-content']}`}>
                  <div className={`${styles['mobile-search__dropdown-item-content-meta']}`}>
                    <div className={`${styles['mobile-search__dropdown-item-content-meta__top']}`}>
                      <Rating value={movie.tmdbRating} style={{ padding: '2px 8px' }} />
                      <span>{movie.releaseYear}</span>
                    </div>
                    {movie.genres?.length > 0 && <span>{movie.genres.join(', ')}</span>}
                    <span>{movie.runtime} min</span>
                  </div>
                  <div className={`${styles['mobile-search__dropdown-item-content-title']}`}>
                    {movie.title}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
        {movies?.length === 0 && (
          <div className={`${styles['mobile-search__message']}`}>Фильмы не найдены</div>
        )}
        {loading && <div className={`${styles['mobile-search__message']}`}>Загрузка...</div>}
        {error && (
          <div className={`${styles['mobile-search__message']}`}>Ошибка при загрузке данных</div>
        )}
      </div>
    </div>
  );
};

export default MobileSearch;
