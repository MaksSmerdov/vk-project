import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import Modal from '../../ui/Modal/Modal';
import Logo from '../Logo/Logo';
import styles from './AuthModal.module.scss';
import RegisterForm from './RegisterForm/RegisterForm';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = React.useState(false);

  const switchToRegister = () => setIsRegistering(true);
  const switchToLogin = () => setIsRegistering(false);

  return (
    <Modal onClose={onClose}>
      <div className={styles['auth__container']}>
        <div className={styles['auth__container__header']}>
          <Logo color="black" />
        </div>
        {isRegistering ? (
          <RegisterForm switchToLogin={switchToLogin} />
        ) : (
          <LoginForm switchToRegister={switchToRegister} closeModal={onClose} />
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
