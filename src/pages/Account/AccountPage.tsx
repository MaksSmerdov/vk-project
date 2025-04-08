import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styles from './AccountPage.module.scss';

export const AccountPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <section className={'page'}>
      <h2 className={'page__title title-reset'}>Мой аккаунт</h2>
      <ul className={`${styles['account__nav']} page__nav list-reset`}>
        <li className={`page__nav-item`} style={{ padding: '0px' }}>
          <NavLink
            to="favorites"
            className={({ isActive }) => `page__nav-link ${isActive ? 'active' : ''}`}>
            <FaRegHeart />
            {isMobile ? 'Избранное' : 'Избранные фильмы'}
          </NavLink>
        </li>
        <li className="page__nav-item" style={{ padding: '0px' }}>
          <NavLink
            to="settings"
            className={({ isActive }) => `page__nav-link ${isActive ? 'active' : ''}`}>
            <FiUser />
            {isMobile ? 'Настройки' : 'Настройка аккаунта'}
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </section>
  );
};

export default AccountPage;
