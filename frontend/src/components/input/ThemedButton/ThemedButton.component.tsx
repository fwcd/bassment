import { ThemedText } from '@bassment/components/display/ThemedText';
import { useThemedButtonStyles } from '@bassment/components/input/ThemedButton/ThemedButton.style';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';

interface ThemedButtonProps extends PressableProps {}

export function ThemedButton(props: ThemedButtonProps) {
  const styles = useThemedButtonStyles();
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        ...(pressed ? [styles.pressed] : []),
      ]}>
      <ThemedText selectable={false}>{props.children}</ThemedText>
    </Pressable>
  );
}
