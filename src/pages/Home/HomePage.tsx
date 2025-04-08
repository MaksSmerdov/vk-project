import * as React from 'react';
import BestFilms from '../../components/BestFilms/BestFilms';
import Intro from '../../components/Intro/Intro';

const HomePage: React.FC = () => {
  return (
    <section className={'page'}>
      <Intro />
      <BestFilms />
    </section>
  );
};

export default HomePage;
