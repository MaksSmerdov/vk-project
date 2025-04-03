import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  onClick,
  ...rest
}) => {
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
    <button className={`${styles['button']} ${styles[variant]}`} onClick={onClick} {...rest}>
      {content}
    </button>
  );
};

export default Button;
