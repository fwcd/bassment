import { useThemedTextFieldStyles } from '@bassment/components/input/ThemedTextField/ThemedTextField.style';
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface ThemedTextFieldProps extends TextInputProps {}

export function ThemedTextField({ style, ...props }: ThemedTextFieldProps) {
  const styles = useThemedTextFieldStyles();
  return <TextInput {...props} style={[styles.textField, style]} />;
}
