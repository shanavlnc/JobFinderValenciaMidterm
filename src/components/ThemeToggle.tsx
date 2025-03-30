import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.text }]}>Dark Mode</Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={theme.colors.primary}
        trackColor={{ false: '#767577', true: theme.colors.primary }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginRight: 8,
  },
});

export default ThemeToggle;