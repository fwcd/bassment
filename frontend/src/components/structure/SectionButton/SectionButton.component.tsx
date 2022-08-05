import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { ThemedButton } from '@bassment/components/input/ThemedButton';
import React from 'react';
import { PressableProps } from 'react-native';

interface SectionButtonProps extends PressableProps {
  iconName: string;
}

export function SectionButton(props: SectionButtonProps) {
  return (
    <ThemedButton hasBackground={false} {...props}>
      <ThemedIcon name={props.iconName} />
    </ThemedButton>
  );
}
