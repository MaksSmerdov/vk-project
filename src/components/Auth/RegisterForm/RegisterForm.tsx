import React, { useState } from 'react';
import { FaKey, FaRegEnvelope } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { registerUser } from '../../../store/slices/authSlice';
import { RegisterData } from '../../../types/authUser';
import AuthInput from '../../../ui/AuthInput/AuthInput';
import Button from '../../../ui/Button/Button';
import { capitalizeFirstLetter } from '../../../utils/utilsFunctions';
import styles from '../AuthModal.module.scss';

interface RegisterFormProps {
  switchToLogin: () => void;
  onRegistrationSuccess: () => void; // новый callback
}

const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin, onRegistrationSuccess }) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    surname?: string;
    password?: string;
    confirmPassword?: string;
    common?: string;
  }>({});

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Сброс ошибок перед новой валидацией

    const newErrors: {
      email?: string;
      name?: string;
      surname?: string;
      password?: string;
      confirmPassword?: string;
      common?: string;
    } = {};

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Введите корректный email';
    }

    // Проверка имени (только русские буквы)
    const russianRegex = /^[А-Яа-яЁё\s]+$/;
    if (!russianRegex.test(name)) {
      newErrors.name = 'Только русские буквы';
    }

    // Проверка фамилии (только русские буквы)
    if (!russianRegex.test(surname)) {
      newErrors.surname = 'Только русские буквы';
    }

    if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const registrationData: RegisterData = { email, password, name, surname };
    dispatch(registerUser(registrationData))
      .unwrap()
      .then(() => {
        toast.success('Вы успешно зарегистрировались!');
        onRegistrationSuccess();
      })
      .catch((err) => {
        toast.error(`Ошибка регистрации: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          error={errors.email}
          required
        />
        <AuthInput
          icon={<FiUser />}
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
          error={errors.name}
          required
        />
        <AuthInput
          icon={<FiUser />}
          type="text"
          placeholder="Фамилия"
          value={surname}
          onChange={(e) => setSurname(capitalizeFirstLetter(e.target.value))}
          error={errors.surname}
          required
        />
        <AuthInput
          icon={<FaKey />}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />
        <AuthInput
          icon={<FaKey />}
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          required
        />
      </div>

      <div className={styles['auth__container__footer']}>
        <Button type="submit">{isLoading ? 'Отправка данных...' : 'Зарегистрироваться'}</Button>
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
