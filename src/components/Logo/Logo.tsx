import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Logo.module.scss';

interface LogoProps {
  useNavLink?: boolean;
}

const Logo: React.FC<LogoProps> = ({ useNavLink = true }) => {
  const content = (
    <>
      <img className={styles['logo__img']} src="/images/marusya_logo.png" alt="logo" />
      <span className={styles['logo__span']}>маруся</span>
    </>
  );

  return useNavLink ? (
    <NavLink className={styles['logo']} to="/home">
      {content}
    </NavLink>
  ) : (
    <div className={styles['logo']}>{content}</div>
  );
};

export default Logo;
