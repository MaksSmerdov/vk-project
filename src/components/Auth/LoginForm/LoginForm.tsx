import React from 'react';
import { FaKey, FaRegEnvelope } from 'react-icons/fa';
import AuthInput from '../../../ui/AuthInput/AuthInput';
import Button from '../../../ui/Button/Button';
import styles from '../AuthModal.module.scss';

interface LoginFormProps {
  switchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister }) => {
  return (
    <>
      <div className={styles['auth__container__body']}>
        <AuthInput icon={<FaRegEnvelope />} type="text" placeholder="Электронная почта" />
        <AuthInput icon={<FaKey />} type="password" placeholder="Пароль" />
      </div>
      <div className={styles['auth__container__footer']}>
        <Button>Войти</Button>
        <button className={`${styles['auth__btn']} btn-reset`} onClick={switchToRegister}>
          Регистрация
        </button>
      </div>
    </>
  );
};

export default LoginForm;
