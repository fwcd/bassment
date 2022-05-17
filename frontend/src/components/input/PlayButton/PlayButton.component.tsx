import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { ThemedButton } from '@bassment/components/input/ThemedButton';
import { useStyles } from '@bassment/styles';
import React from 'react';

interface PlayButtonProps {
  isPlaying: boolean;
  setPlaying: (playing: boolean) => void;
}

export function PlayButton({ isPlaying, setPlaying }: PlayButtonProps) {
  const globalStyles = useStyles();

  return (
    <ThemedButton hasBackground={false} onPress={() => setPlaying(!isPlaying)}>
      <ThemedIcon
        name={isPlaying ? 'pause-outline' : 'play-outline'}
        size={globalStyles.icon.largeSize}
      />
    </ThemedButton>
  );
}
