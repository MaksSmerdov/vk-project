import React, { useEffect, useRef, useState } from 'react';
import { FaUndo } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';
import MovieCard from '../../components/Cards/MovieCard/MovieCard';
import Button from '../../ui/Button/Button';
import { capitalizeFirstLetter } from '../../utils/utilsFunctions';
import styles from './GenresMoviePage.module.scss';
import { useGenreMovies } from '../../hooks/useGenreMovies';

const GenreMoviesPage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>();
  const { movies, isLoading, error, hasMore, loadNextPage } = useGenreMovies(genre);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        loadNextPage();
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasMore, loadNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Функция прокрутки в начало
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!movies.length && isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Произошла ошибка при загрузке данных</p>;
  }

  return (
    <section className="page">
      <NavLink to="/genres" className={`${styles.movies__title} page__title arrow title-reset`}>
        {capitalizeFirstLetter(genre || '')}
      </NavLink>
      <ul className={`${styles.movies__list} list-reset`}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} top={false} />
        ))}
      </ul>

      {isLoading && <div className={`${styles['movies__loading']}`}>Загрузка фильмов...</div>}

      {hasMore && <div ref={sentinelRef} style={{ height: '1px' }} />}

      {!hasMore && <p style={{ textAlign: 'center' }}>Все фильмы загружены</p>}

      {showScrollTop && (
        <Button
          icon={<FaUndo />}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '20px',
          }}></Button>
      )}
    </section>
  );
};

export default GenreMoviesPage;
