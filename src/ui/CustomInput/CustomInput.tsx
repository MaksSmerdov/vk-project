import { FiSearch } from 'react-icons/fi';
import styles from './CustomInput.module.scss';

const CustomInput = () => {
  return (
    <div className={styles['custom-input']}>
      <FiSearch className={styles['custom-input__icon']} />
      <input
        type="text"
        placeholder="Поиск"
        className={styles['custom-input__field']}
      />
    </div>
  );
};

export default CustomInput;