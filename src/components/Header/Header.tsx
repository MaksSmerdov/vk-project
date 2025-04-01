import * as React from 'react';
import { NavLink } from 'react-router-dom';
import CustomInput from '../../ui/CustomInput/CustomInput';
import Logo from '../Logo/Logo';
import { FiList, FiUser } from 'react-icons/fi';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={`${styles.header} container`}>
      <div className={styles['header__left']}>
        <Logo />
      </div>
      <div className={styles['header__right']}>
        <ul className={`${styles['header__nav']} list-reset`}>
          {/* Пункт "Главная" получит дополнительный класс для скрытия на мобильных */}
          <li className={`${styles['header__nav-item']} ${styles['header__nav-item--home']}`}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? `${styles['header__nav-link']} ${styles.active}`
                  : styles['header__nav-link']
              }>
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
              }>
              <span className={styles['header__nav-text']}>Жанры</span>
              <span className={styles['header__nav-icon']}>
                <FiList />
              </span>
            </NavLink>
          </li>
        </ul>
        <CustomInput />
        <button className={`${styles['header__btn']} btn-reset`}>
          {/* Текстовая версия для десктопа */}
          <span className={styles['header__btn-text']}>Войти</span>
          {/* Иконка для мобильного */}
          <span className={styles['header__btn-icon']}>
            <FiUser />
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
