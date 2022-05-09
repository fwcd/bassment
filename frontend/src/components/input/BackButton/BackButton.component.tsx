import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { ThemedButton } from '@bassment/components/input/ThemedButton';
import { useStyles } from '@bassment/styles';
import React from 'react';

interface BackButtonProps {
  onBack: () => void;
}

export function BackButton(props: BackButtonProps) {
  const globalStyles = useStyles();

  return (
    <ThemedButton hasBackground={false} onPress={props.onBack}>
      <ThemedIcon
        name={'play-back-outline'}
        size={globalStyles.icon.largeSize}
      />
    </ThemedButton>
  );
}
