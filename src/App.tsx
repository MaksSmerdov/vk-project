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

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

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
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </ThemeWrapper>
  );
};

export default App;
