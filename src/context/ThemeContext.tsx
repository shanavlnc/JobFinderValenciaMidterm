import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    background: '#f9f9f9',
    card: '#ffffff',
    text: '#333333',
    border: '#e0e0e0',
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#3498db',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    border: '#333333',
  },
};

type ThemeContextType = {
  isDark: boolean;
  theme: typeof CustomTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  theme: CustomTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{
      isDark,
      theme: isDark ? CustomDarkTheme : CustomTheme,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);