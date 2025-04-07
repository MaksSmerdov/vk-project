import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';

export const AccountPage: React.FC = () => {
  return (
    <section className={'page'}>
      <h2 className={'page__title title-reset'}>Мой аккаунт</h2>
      <ul className="page__nav list-reset" style={{ paddingTop: '64px', gap: '64px' }}>
        <li className={`page__nav-item`} style={{ padding: '0px' }}>
          <NavLink
            to="favorites"
            className={({ isActive }) => `page__nav-link ${isActive ? 'active' : ''}`}>
            <FaRegHeart />
            Избранные фильмы
          </NavLink>
        </li>
        <li className="page__nav-item" style={{ padding: '0px' }}>
          <NavLink
            to="settings"
            className={({ isActive }) => `page__nav-link ${isActive ? 'active' : ''}`}>
            <FiUser />
            Настройка аккаунта
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </section>
  );
};

export default AccountPage;
