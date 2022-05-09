import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { ThemedButton } from '@bassment/components/input/ThemedButton';
import { useStyles } from '@bassment/styles';
import React from 'react';

interface PlayButtonProps {
  isPlaying: boolean;
  setPlaying: (playing: boolean) => void;
}

export function PlayButton(props: PlayButtonProps) {
  const globalStyles = useStyles();

  return (
    <ThemedButton
      hasBackground={false}
      onPress={() => props.setPlaying(!props.isPlaying)}>
      <ThemedIcon
        name={props.isPlaying ? 'pause-outline' : 'play-outline'}
        size={globalStyles.icon.largeSize}
      />
    </ThemedButton>
  );
}
