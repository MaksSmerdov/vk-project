import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountPage from './pages/Account/AccountPage';
import AccountFavorites from './pages/Account/components/AccountFavorites';
import AccountSettings from './pages/Account/components/AccountSettings';
import ScrollToTop from './providers/ScrollToTop';
import GenresPage from './pages/Genres/GenresPage';
import GenreMoviesPage from './pages/GenresMovie/GenresMoviePage';
import HomePage from './pages/Home/HomePage';
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
        <Route path="/account" element={<AccountPage />}>
          <Route path="favorites" element={<AccountFavorites />} />
          <Route path="settings" element={<AccountSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
