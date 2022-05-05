import { useThemedTextStyles } from '@bassment/components/display/ThemedText/ThemedText.style';
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
  const styles = useThemedTextStyles();
  return (
    <Text style={[styles.themedText, ...(style ? [style] : [])]}>
      {children}
    </Text>
  );
}
