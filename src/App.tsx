import { useEffect } from 'react';
import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ThemeWrapper from './components/ThemeWrapper/ThemeWrapper';
import { useAppDispatch } from './hooks/useAppDispatch';
import HomePage from './pages/home/HomePage';
import './styles/app.scss';
import { fetchProfile } from './store/slices/authSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <ThemeWrapper>
      <BrowserRouter>
        <div className={`body`}>
          <div className="container">
            <Header />
            <main className="app">
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/genres" />
                <Route path="/login" />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
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
