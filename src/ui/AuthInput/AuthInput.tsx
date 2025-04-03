import React from 'react';
import styles from './AuthInput.module.scss';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ icon, error, ...inputProps }) => {
  return (
    <div className={`${styles['custom-input']} ${error ? styles['custom-input--error'] : ''}`}>
      {icon && <span className={styles['custom-input__icon']}>{icon}</span>}
      <input {...inputProps} className={`${styles['custom-input__field']}`} />
      {error && <p className={styles['custom-input__error']}>{error}</p>}
    </div>
  );
};

export default AuthInput;
