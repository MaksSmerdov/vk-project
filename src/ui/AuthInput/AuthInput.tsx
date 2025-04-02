import React from 'react';
import styles from './AuthInput.module.scss';

interface AuthInputProps {
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ icon, type, placeholder }) => {
  return (
    <div className={styles['custom-input']}>
      <span className={styles['custom-input__icon']}>{icon}</span>
      <input type={type} placeholder={placeholder} className={styles['custom-input__field']} />
    </div>
  );
};

export default AuthInput;
