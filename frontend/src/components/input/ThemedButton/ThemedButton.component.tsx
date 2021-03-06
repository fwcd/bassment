import { ThemedText } from '@bassment/components/display/ThemedText';
import { useThemedButtonStyles } from '@bassment/components/input/ThemedButton/ThemedButton.style';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';

interface ThemedButtonProps extends PressableProps {
  hasBackground?: boolean;
}

export function ThemedButton({ hasBackground, ...props }: ThemedButtonProps) {
  const styles = useThemedButtonStyles(hasBackground ?? true);

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        ...(pressed ? [styles.pressed] : []),
        ...(props.disabled ? [styles.disabled] : []),
      ]}>
      <ThemedText selectable={false}>{props.children}</ThemedText>
    </Pressable>
  );
}
