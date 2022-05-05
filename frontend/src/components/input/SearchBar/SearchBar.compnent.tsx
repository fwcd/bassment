import { useSearchBarStyles } from '@bassment/components/input/SearchBar/SearchBar.style';
import React from 'react';
import { TextInput } from 'react-native';

export function SearchBar() {
  const styles = useSearchBarStyles();
  return <TextInput placeholder="Search..." style={styles.searchBar} />;
}
