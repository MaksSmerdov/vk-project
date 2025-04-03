import React from 'react';
import styles from './AuthInput.module.scss';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ icon, error, ...inputProps }) => {
  const hasError = Boolean(error);

  return (
    <div className={`${styles['custom-input']} ${hasError ? styles['custom-input__error'] : ''}`}>
      {icon && (
        <span
          className={`${styles['custom-input__icon']} ${hasError ? styles['custom-input__icon-error'] : ''}`}>
          {icon}
        </span>
      )}
      <input {...inputProps} className={styles['custom-input__field']} />
      {/* Если есть текст ошибки, покажем label */}
      {error && <label className={styles['custom-input__error-label']}>{error}</label>}
    </div>
  );
};

export default AuthInput;
