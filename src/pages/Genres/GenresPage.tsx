import React, { useState } from 'react';
import GenreCard from '../../components/Cards/GenreCard/GenreCard';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import Button from '../../ui/Button/Button';
import styles from './GenresPage.module.scss';

const GenresPage: React.FC = () => {
  const { loading, data, error } = useFetchMovie<string[]>('movie/Genres');
  const [visibleCount, setVisibleCount] = useState(8);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const genresToDisplay = data.slice(0, visibleCount);

  return (
    <section className="page">
      <h2 className="page__title title-reset">Жанры фильмов</h2>
      <ul className={`${styles['genres__list']} list-reset`}>
        {genresToDisplay.map((genre) => (
          <GenreCard key={genre} genre={genre} />
        ))}
      </ul>
      {visibleCount < data.length && (
        <div className={`${styles['genres__btn']}`}>
          <Button onClick={handleShowMore}>Показать еще</Button>
        </div>
      )}
    </section>
  );
};

export default GenresPage;
