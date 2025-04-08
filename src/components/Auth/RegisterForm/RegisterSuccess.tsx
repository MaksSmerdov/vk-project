import React from 'react';
import Button from '../../../ui/Button/Button';
import styles from '../AuthModal.module.scss';

interface RegisterSuccessProps {
  switchToLogin: () => void;
}

export const RegisterSuccess: React.FC<RegisterSuccessProps> = ({ switchToLogin }) => {
  return (
    <div className={styles['auth__container__form']}>
      <h2 className={`${styles['auth__container__title']} title-reset`}>Регистрация завершена</h2>
      <span className={`${styles['auth__container__span']}`}>
        Используйте вашу электронную почту для входа
      </span>
      <div className={styles['auth__container__footer']}>
        <Button type="button" onClick={switchToLogin}>
          Войти
        </Button>
      </div>
    </div>
  );
};
