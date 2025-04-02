import React from 'react';
import styles from './Logo.module.scss';

interface LogoProps {
  color?: string; // задаём опциональный пропс для цвета
}

const Logo: React.FC<LogoProps> = ({ color }) => {
  return (
    <div className={styles['logo']}>
      <img
        className={styles['logo__img']}
        src="/images/marusya_logo.png"
        alt="logo"
      />
      <span
        className={styles['logo__span']}
        style={color ? { color } : undefined} // если передан пропс color, используем его
      >
        маруся
      </span>
    </div>
  );
};

export default Logo;
