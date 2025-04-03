import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logoutUser } from '../../store/slices/authSlice';
import type { RootState } from '../../store/store';
import SearchInput from '../../ui/SearchInput/SearchInput';
import ThemeSwitcher from './ThemeSwitcher';
import AuthModal from '../Auth/AuthModal';
import Logo from '../Logo/Logo';
import { FiList, FiUser } from 'react-icons/fi';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const logOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Вы успешно вышли!');
    } catch (error) {
      console.error('Ошибка при логауте:', error);
    }
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
                  `${styles['header__nav-link']} ${isActive ? styles.active : ''}`
                }>
                Главная
              </NavLink>
            </li>
            <li className={styles['header__nav-item']}>
              <NavLink
                to="/genres"
                className={({ isActive }) =>
                  `${styles['header__nav-link']} ${isActive ? styles.active : ''}`
                }>
                <span className={styles['header__nav-text']}>Жанры</span>
                <span className={styles['header__nav-icon']}>
                  <FiList />
                </span>
              </NavLink>
            </li>
          </ul>
          <SearchInput />
          {user ? (
            <>
              <button className={`${styles['header__btn']} btn-reset`}>
                <span className={styles['header__btn-text']}>{user.name}</span>
                <span className={styles['header__btn-icon']}>
                  <FiUser />
                </span>
              </button>
              <button className={`${styles['header__btn']} btn-reset`} onClick={logOut}>
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <button className={`${styles['header__btn']} btn-reset`} onClick={openModal}>
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
