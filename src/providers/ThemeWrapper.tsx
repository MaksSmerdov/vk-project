import React from 'react';
import { useTheme } from '../hooks/useThemeClass';

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  return <div className={theme}>{children}</div>;
};

export default ThemeWrapper;
