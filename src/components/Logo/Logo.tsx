import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import styles from './Logo.module.scss';

interface LogoProps {
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ color }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const textColor = color ? color : theme === 'light' ? 'black' : 'white';

  return (
    <div className={styles['logo']}>
      <img className={styles['logo__img']} src="/images/marusya_logo.png" alt="logo" />
      <span className={styles['logo__span']} style={{ color: textColor }}>
        маруся
      </span>
    </div>
  );
};

export default Logo;
