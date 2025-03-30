// src/components/SearchHeader.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchHeaderProps {
  value: string;
  onChangeText: (text: string) => void;
  theme: {
    card: string;
    text: string;
    borderColor?: string;
  };
}

const SearchHeader = ({ value, onChangeText, theme }: SearchHeaderProps) => (
  <View style={styles.container}>
    <TextInput
      style={[
        styles.input, 
        { 
          backgroundColor: theme.card, 
          color: theme.text,
          borderColor: theme.borderColor || '#ccc'
        }
      ]}
      placeholder="Search jobs..."
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9FAFB'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16
  }
});

export default SearchHeader;