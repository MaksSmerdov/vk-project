import React, { useState } from 'react';
import LoginForm from './LoginForm/LoginForm';
import Modal from '../../ui/Modal/Modal';
import Logo from '../Logo/Logo';
import styles from './AuthModal.module.scss';
import RegisterForm from './RegisterForm/RegisterForm';
import { RegisterSuccess } from './RegisterForm/RegisterSuccess';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const switchToRegister = () => {
    setIsRegistering(true);
    setRegistrationSuccess(false);
  };

  const switchToLogin = () => {
    setIsRegistering(false);
    setRegistrationSuccess(false);
  };

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles['auth__container']}>
        <div className={styles['auth__container__header']}>
          <Logo useNavLink={false} />
        </div>
        {registrationSuccess ? (
          <RegisterSuccess switchToLogin={switchToLogin} />
        ) : isRegistering ? (
          <RegisterForm
            switchToLogin={switchToLogin}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        ) : (
          <LoginForm switchToRegister={switchToRegister} closeModal={onClose} />
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
