import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const useTheme = () => {
  return useSelector((state: RootState) => state.theme.theme);
};
