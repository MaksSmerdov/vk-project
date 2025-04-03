import React, { useState } from 'react';
import { FaKey, FaRegEnvelope } from 'react-icons/fa';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { loginUser } from '../../../store/slices/authSlice';
import { AuthInfo } from '../../../types/authUser';
import AuthInput from '../../../ui/AuthInput/AuthInput';
import Button from '../../../ui/Button/Button';
import styles from '../AuthModal.module.scss';
import { toast } from 'react-toastify';

interface LoginFormProps {
  switchToRegister: () => void;
  closeModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister, closeModal }) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authData: AuthInfo = { email, password };

    dispatch(loginUser(authData))
      .unwrap()
      .then(() => {
        toast.success('Успешная авторизация!');
        closeModal();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <form className={styles['auth__container__form']} onSubmit={handleLogin}>
      <div className={styles['auth__container__body']}>
        <AuthInput
          icon={<FaRegEnvelope />}
          type="text"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthInput
          icon={<FaKey />}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={styles['auth__container__footer']}>
        <Button type="submit">Войти</Button>
        <button
          className={`${styles['auth__btn']} btn-reset`}
          type="button"
          onClick={switchToRegister}>
          Регистрация
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
