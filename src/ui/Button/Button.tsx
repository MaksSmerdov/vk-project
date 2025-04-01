import { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
  onClick?: () => void;
}

const Button = ({ children, variant = 'primary', icon, onClick }: ButtonProps) => {
  const content =
    icon && !children ? (
      icon
    ) : (
      <>
        {icon && <span className={styles['icon']}>{icon}</span>}
        {children}
      </>
    );

  return (
    <button className={`${styles['button']} ${styles[variant]}`} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
