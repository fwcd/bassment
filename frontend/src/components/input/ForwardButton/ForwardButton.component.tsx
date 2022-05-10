import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { ThemedButton } from '@bassment/components/input/ThemedButton';
import { useStyles } from '@bassment/styles';
import React from 'react';

interface ForwardButtonProps {
  onForward: () => void;
}

export function ForwardButton(props: ForwardButtonProps) {
  const globalStyles = useStyles();

  return (
    // TODO: Undisable
    <ThemedButton hasBackground={false} onPress={props.onForward} disabled>
      <ThemedIcon
        name={'play-forward-outline'}
        size={globalStyles.icon.largeSize}
      />
    </ThemedButton>
  );
}
