import * as React from 'react';
import BestFilms from '../../components/BestFilms/BestFilms';
import Intro from '../../components/Intro/Intro';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  return (
    <div className={`${styles['HomePage']}`}>
      <Intro />
      <BestFilms />
    </div>
  );
};

export default HomePage;
