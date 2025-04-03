import React, { useState } from 'react';
import { FaKey, FaRegEnvelope } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { registerUser } from '../../../store/slices/authSlice';
import { RegisterData } from '../../../types/authUser';
import AuthInput from '../../../ui/AuthInput/AuthInput';
import Button from '../../../ui/Button/Button';
import styles from '../AuthModal.module.scss';

interface RegisterFormProps {
  switchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    const registrationData: RegisterData = { email, password, name, surname };
    dispatch(registerUser(registrationData));
  };

  return (
    <form className={styles['auth__container__form']} onSubmit={handleRegister}>
      <h2 className={`${styles['auth__container__title']} title-reset`}>Регистрация</h2>
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
          icon={<FiUser />}
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <AuthInput
          icon={<FiUser />}
          type="text"
          placeholder="Фамилия"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
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
        <AuthInput
          icon={<FaKey />}
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className={styles['auth__error']}>{error}</p>}
      </div>
      <div className={styles['auth__container__footer']}>
        <Button type="submit">Зарегистрироваться</Button>
        <button
          className={`${styles['auth__btn']} btn-reset`}
          type="button"
          onClick={switchToLogin}>
          У меня есть пароль
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
