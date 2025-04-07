import React from 'react';
import { FiMail } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { logoutUser } from '../../../store/slices/authSlice';
import { RootState } from '../../../store/store';
import Button from '../../../ui/Button/Button';
import { getInitials } from '../../../utils/utilsFunctions';
import styles from '../AccountPage.module.scss';

const AccountSettings: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/home');
      toast.success('Вы успешно вышли!');
    } catch (error) {
      console.error('Ошибка при логауте:', error);
    }
  };

  if (!user) return <div>Пожалуйста авторизуйтесь</div>;

  return (
    <section className={`${styles['account__container']} page`} style={{ paddingBottom: '0px' }}>
      <div className={`${styles['account__settings']}`}>
        <div className={`${styles['account__settings-row']}`}>
          <div className={`${styles['account__settings-icon']}`}>
            {getInitials(user.name, user.surname)}
          </div>
          <div className={`${styles['account__settings-info']}`}>
            <span className={`${styles['account__settings-info--title']}`}>Имя Фамилия</span>
            <span className={`${styles['account__settings-info--text']}`}>
              {user.name} {user.surname}
            </span>
          </div>
        </div>

        <div className={`${styles['account__settings-row']}`}>
          <div className={`${styles['account__settings-icon']}`}>
            <FiMail />
          </div>
          <div className={`${styles['account__settings-info']}`}>
            <span className={`${styles['account__settings-info--title']}`}>Электронная почта</span>
            <span className={`${styles['account__settings-info--text']}`}>{user.email}</span>
          </div>
        </div>
      </div>
      <div className={`${styles['account__settings-btn']}`}>
        <Button onClick={handleLogout}>Выйти из аккаунта</Button>
      </div>
    </section>
  );
};

export default AccountSettings;
