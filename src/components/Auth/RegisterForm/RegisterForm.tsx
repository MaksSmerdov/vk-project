import React from 'react';
import { FaKey, FaRegEnvelope } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import AuthInput from '../../../ui/AuthInput/AuthInput';
import Button from '../../../ui/Button/Button';
import styles from '../AuthModal.module.scss';

interface RegisterFormProps {
  switchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
  return (
    <>
      <h2 className={`${styles['auth__container__title']} title-reset`}>Регистрация</h2>
      <div className={styles['auth__container__body']}>
        <AuthInput icon={<FaRegEnvelope />} type="text" placeholder="Электронная почта" />
        <AuthInput icon={<FiUser />} type="text" placeholder="Имя" />
        <AuthInput icon={<FiUser />} type="text" placeholder="Фамилия" />
        <AuthInput icon={<FaKey />} type="password" placeholder="Пароль" />
        <AuthInput icon={<FaKey />} type="password" placeholder="Подтвердите пароль" />
      </div>
      <div className={styles['auth__container__footer']}>
        <Button>Зарегистрироваться</Button>
        <button className={`${styles['auth__btn']} btn-reset`} onClick={switchToLogin}>
          У меня есть пароль
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
