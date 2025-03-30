import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';  // Updated import path

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder 
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    height: 40,
    paddingHorizontal: 8,
  },
});

export default SearchBar;