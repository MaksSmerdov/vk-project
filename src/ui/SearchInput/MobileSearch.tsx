import React, { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { Movie } from '../../types/movie';
import Rating from '../Rating/Rating';
import styles from './SearchInput.module.scss';

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

  return (
    <div className={styles['mobile-search-overlay']}>
      <div className={styles['mobile-search-content']}>
        <div className={styles['mobile-search-header']}>
          <FiSearch className={styles['mobile-search-icon']} />
          <input
            type="text"
            placeholder="Поиск"
            className={styles['mobile-search-field']}
            value={searchTerm}
            onChange={handleChange}
            autoFocus
          />
          <button type="button" className={styles['mobile-search-close-btn']} onClick={onClose}>
            <FiX />
          </button>
        </div>
        {isDropdownOpen && !loading && !error && movies && movies.length > 0 && (
          <ul className={`${styles['mobile-search-dropdown']} list-reset`}>
            {movies.map((movie) => (
              <li
                key={movie.id}
                className={styles['mobile-search-dropdown-item']}
                onClick={() => handleSelectMovie(movie.id)}>
                <img
                  className={styles['mobile-search-dropdown-item-poster']}
                  src={movie.posterUrl}
                  alt={movie.title}
                />
                <div className={styles['mobile-search-dropdown-item-content']}>
                  <div className={styles['mobile-search-dropdown-item-content-meta']}>
                    <div>
                      <Rating value={movie.tmdbRating} style={{ padding: '2px 8px' }} />
                      <span>{movie.releaseYear}</span>
                    </div>
                    {movie.genres?.length > 0 && <span>{movie.genres.join(', ')}</span>}
                    <span>{movie.runtime} min</span>
                  </div>
                  <div className={styles['mobile-search-dropdown-item-content-title']}>
                    {movie.title}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {movies?.length === 0 && (
          <div className={styles['mobile-search-message']}>Фильмы не найдены</div>
        )}
        {loading && <div className={styles['mobile-search-message']}>Загрузка...</div>}
        {error && <div className={styles['mobile-search-message']}>Ошибка при загрузке данных</div>}
      </div>
    </div>
  );
};

export default MobileSearch;
