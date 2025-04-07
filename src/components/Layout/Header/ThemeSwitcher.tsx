import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../store/slices/themeSlice';
import type { RootState } from '../../../store/store';
import styles from './Header.module.scss';

const ThemeSwitcher = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <>
      <button className={'page__btn btn-reset'} onClick={() => dispatch(toggleTheme())}>
        <span className={styles['header__btn-switcher']}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </span>
      </button>
    </>
  );
};

export default ThemeSwitcher;
