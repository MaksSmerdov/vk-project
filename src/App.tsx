import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/home/HomePage';
import './styles/app.scss'


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="body">
        <div className="container">
          <Header />
          <main className="app">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/genres"  />
              <Route path="/login"  />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
