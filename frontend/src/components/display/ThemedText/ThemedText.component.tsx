import { useTheme } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface ThemedTextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

/**
 * A wrapper around the built-in `Text` component that respects
 * the currently used theme (light or dark).
 */
export function ThemedText({ children, style }: ThemedTextProps) {
  const theme = useTheme();
  return (
    <Text style={[{ color: theme.colors.text }, ...(style ? [style] : [])]}>
      {children}
    </Text>
  );
}
