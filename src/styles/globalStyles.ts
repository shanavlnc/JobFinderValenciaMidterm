import { StyleSheet } from 'react-native';

export const COLORS = {
  light: {
    background: '#ffffff',
    text: '#333333',
    primary: '#007bff',
    secondary: '#6c757d',
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    primary: '#1e90ff',
    secondary: '#aaaaaa',
  },
};

export const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.medium,
    backgroundColor: COLORS.light.background,
  },
  text: {
    fontSize: 16,
    color: COLORS.light.text,
  },
  button: {
    backgroundColor: COLORS.light.primary,
    padding: SPACING.medium,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
