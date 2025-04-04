import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './pages/Home/HomePage';
import GenresPage from './pages/Genres/GenresPage';
import GenreMoviesPage from './pages/GenresMovie/GenresMovie';
import MoviePage from './pages/Movie/MoviePage';

const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genres/:genre" element={<GenreMoviesPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/login" element={null} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
