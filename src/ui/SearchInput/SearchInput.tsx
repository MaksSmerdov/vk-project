import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { Movie } from '../../types/movie';
import Rating from '../Rating/Rating';
import styles from './SearchInput.module.scss';

const SearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const {
    loading,
    data: movies,
    error,
    refetch,
  } = useFetchMovie<Movie[]>(
    debouncedSearchTerm ? `movie?title=${encodeURIComponent(debouncedSearchTerm)}` : ''
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!loading && !error && movies && movies.length > 0 && searchTerm.trim() !== '') {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [loading, error, movies, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectMovie = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    setIsDropdownOpen(false);
  };

  const handleFocus = () => {
    if (searchTerm.trim() !== '') {
      refetch();
      setIsDropdownOpen(true);
    }
  };

  const handleClearInput = () => {
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <div ref={containerRef} className={styles['custom-input']}>
      <FiSearch className={styles['custom-input__icon']} />
      <input
        type="text"
        placeholder="Поиск"
        className={styles['custom-input__field']}
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      {searchTerm && (
        <button
          type="button"
          className={`${styles['custom-input__clear-btn']} btn-reset`}
          onClick={handleClearInput}>
          <FiX />
        </button>
      )}

      {isDropdownOpen && !loading && !error && movies && movies.length > 0 && (
        <ul className={styles['custom-input__dropdown']}>
          {movies.map((movie) => (
            <li
              key={movie.id}
              className={styles['custom-input__dropdown-item']}
              onClick={() => handleSelectMovie(movie.id)}>
              <img
                className={styles['custom-input__dropdown-item-poster']}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <div className={styles['custom-input__dropdown-item-content']}>
                <div className={styles['custom-input__dropdown-item-content-meta']}>
                  <Rating value={movie.tmdbRating} style={{ padding: '2px 8px' }} />
                  <span>{movie.releaseYear}</span>
                  {movie.genres?.length > 0 && <span>{movie.genres.join(', ')}</span>}
                  <span>{movie.runtime} min</span>
                </div>
                <div className={styles['custom-input__dropdown-item-content-title']}>
                  {movie.title}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {movies?.length === 0 && (
        <div className={`${styles['custom-input__message']}`}>Фильмы не найдены</div>
      )}
      {loading && <div className={`${styles['custom-input__message']}`}>Загрузка...</div>}
      {error && (
        <div className={`${styles['custom-input__message']}`}>Ошибка при загрузке данных</div>
      )}
    </div>
  );
};

export default SearchInput;
