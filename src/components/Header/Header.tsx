import { useState } from 'react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import CustomInput from '../../ui/CustomInput/CustomInput';
import AuthModal from '../Auth/AuthModal';
import Logo from '../Logo/Logo';
import { FiList, FiUser } from 'react-icons/fi';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
    <header className={`${styles.header} container`}>
      <div className={styles['header__left']}>
        <Logo />
      </div>
      <div className={styles['header__right']}>
        <ul className={`${styles['header__nav']} list-reset`}>
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
        <button
          className={`${styles['header__btn']} btn-reset`}
          onClick={openModal}>
          <span className={styles['header__btn-text']}>Войти</span>
          <span className={styles['header__btn-icon']}>
              <FiUser />
            </span>
        </button>
      </div>
    </header>
      {isOpen && <AuthModal onClose={closeModal} />}
</>
  );
};

export default Header;
