import React, { useState } from 'react';
import { FiList, FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { RootState } from '../../../store/store';
import Logo from '../../../ui/Logo/Logo';
import SearchInput from '../../../ui/SearchInput/SearchInput';
import AuthModal from '../../Auth/AuthModal';
import styles from './Header.module.scss';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);

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
          <ul className="page__nav list-reset">
            <li className={`${styles['header__nav-item--home']} page__nav-item`}>
              <NavLink
                to="/home"
                className={({ isActive }) => `page__nav-link ${isActive ? 'active' : ''}`}>
                Главная
              </NavLink>
            </li>
            <li className="page__nav-item">
              <NavLink
                to="/genres"
                className={({ isActive }) => `page__nav-link ${isActive ? 'active' : ''}`}>
                <span className={styles['header__nav-text']}>Жанры</span>
                <span className={styles['header__nav-icon']}>
                  <FiList />
                </span>
              </NavLink>
            </li>
          </ul>
          <SearchInput />
          {user ? (
            <NavLink to="/account/favorites" className="page__nav-link btn-reset">
              <span className={styles['header__btn-text']}>{user.name}</span>
              <span className={styles['header__btn-icon']}>
                <FiUser />
              </span>
            </NavLink>
          ) : (
            <button className={`page__btn btn-reset`} onClick={openModal}>
              <span className={styles['header__btn-text']}>Войти</span>
              <span className={styles['header__btn-icon']}>
                <FiUser />
              </span>
            </button>
          )}
          <ThemeSwitcher />
        </div>
      </header>
      {isOpen && <AuthModal onClose={closeModal} />}
    </>
  );
};

export default Header;
