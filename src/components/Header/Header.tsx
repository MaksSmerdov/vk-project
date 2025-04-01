import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={`${styles.header} container`}>
      <div className={styles['header__logo']}>
        <div className={styles['header__logo-img']}>
          <img src='/images/marusya_logo.png' alt="Logo" />
        </div>
        <div className={styles['header__logo-text']}>
          <img src='/images/marusya_text.png' alt="Logo text" />
        </div>
      </div>
      <ul className={`${styles['header__nav']} list-reset`}>
        <li className={styles['header__nav-item']}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? `${styles['header__nav-link']} ${styles.active}`
                : styles['header__nav-link']
            }
          >
            Главная
          </NavLink>
        </li>
        <li className={styles['header__nav-item']}>
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              isActive
                ? `${styles['header__nav-link']} ${styles.active}`
                : styles['header__nav-link']
            }
          >
            Жанры
          </NavLink>
        </li>
        <li className={`${styles['header__nav-item']} ${styles['header__nav-item--search']}`}>
          <input
            className={styles['header__input']}
            placeholder="Поиск"
            type="search"
          />
        </li>
        <li className={styles['header__nav-item']}>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? `${styles['header__nav-link']} ${styles.active}`
                : styles['header__nav-link']
            }
          >
            Войти
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
