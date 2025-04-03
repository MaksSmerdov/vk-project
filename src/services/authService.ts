import { AuthInfo, RegisterData, SuccessfulResult, User } from '../types/authUser';

export const login = async (data: AuthInfo) => {
  const response = await fetch('https://cinemaguide.skillbox.cc/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Неверные авторизационные данные');
  }
  return await response.json();
};

export const logout = async (): Promise<SuccessfulResult> => {
  const response = await fetch('https://cinemaguide.skillbox.cc/auth/logout', {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Ошибка при выходе из системы');
  }
  return { result: true };
};

export const register = async (user: RegisterData) => {
  const response = await fetch('https://cinemaguide.skillbox.cc/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Ошибка регистрации');
  }
  return await response.json();
};

export const getProfile = async (): Promise<User> => {
  const response = await fetch('https://cinemaguide.skillbox.cc/profile', {
    method: 'GET',
    credentials: 'include', // если требуется для работы с сессией
  });
  if (!response.ok) {
    throw new Error('Не удалось получить данные профиля');
  }
  return await response.json();
};
