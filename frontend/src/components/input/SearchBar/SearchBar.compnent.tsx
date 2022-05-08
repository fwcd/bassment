import { useSearchBarStyles } from '@bassment/components/input/SearchBar/SearchBar.style';
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface SearchBarProps extends TextInputProps {}

export function SearchBar(props: SearchBarProps) {
  const styles = useSearchBarStyles();
  return (
    <TextInput {...props} placeholder="Search..." style={styles.searchBar} />
  );
}
