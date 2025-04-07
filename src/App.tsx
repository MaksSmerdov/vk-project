import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import ThemeWrapper from './providers/ThemeWrapper';
import { useAppDispatch } from './hooks/useAppDispatch';
import './styles/app.scss';
import AppRoutes from './Routes';
import { fetchProfile } from './store/slices/authSlice';
import { fetchFavorites } from './store/slices/favoritesSlice.ts';
import { useSelector } from 'react-redux';
import { RootState } from './store/store.ts';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, user]);

  return (
    <ThemeWrapper>
      <BrowserRouter>
        <div className="body">
          <div className="container">
            <Header />
            <main className="app">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          pauseOnHover={false}
          closeOnClick={true}
        />
      </BrowserRouter>
    </ThemeWrapper>
  );
};

export default App;
