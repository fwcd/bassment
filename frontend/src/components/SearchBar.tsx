import { useStyles } from '@bassment/styles';
import React from 'react';
import { TextInput } from 'react-native';

export function SearchBar() {
  const styles = useStyles();
  return (
    <TextInput
      placeholder="Search..."
      style={[
        styles.margin,
        styles.smallPadding,
        styles.background,
        styles.label,
      ]}
    />
  );
}
