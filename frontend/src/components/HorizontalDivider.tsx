import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

export function HorizontalDivider() {
  const theme = useTheme();
  return (
    <View
      style={{
        borderBottomColor: theme.colors.border,
        borderBottomWidth: 1,
        margin: 10,
      }}
    />
  );
}
