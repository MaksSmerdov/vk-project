import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={`${styles['logo']}`}>
      <img className={`${styles['logo__img']}`} src="/images/marusya_logo.png" alt="logo" />
      <span className={`${styles['logo__span']}`}>маруся</span>
    </div>
  );
};

export default Logo;
