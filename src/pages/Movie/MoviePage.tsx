import { useParams } from 'react-router-dom';
import Intro from '../../components/Intro/Intro';
import MovieDescription from '../../components/MovieDescription/MovieDescription';
import { useFetchMovie } from '../../hooks/useFetchMovie';
import { Movie } from '../../types/movie';

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, data, error } = useFetchMovie<Movie>(`movie/${id}`);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error!</p>;

  return (
    <>
      <Intro api={`${id}`} homepage={false} />
      <MovieDescription movie={data} />
    </>
  );
};

export default MoviePage;
