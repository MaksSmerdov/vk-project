import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/home/HomePage';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/genres"  />
        <Route path="/login"  />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
