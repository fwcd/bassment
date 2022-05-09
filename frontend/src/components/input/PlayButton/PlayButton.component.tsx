import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { ThemedButton } from '@bassment/components/input/ThemedButton';
import React from 'react';

interface PlayButtonProps {
  isPlaying: boolean;
  setPlaying: (playing: boolean) => void;
}

export function PlayButton(props: PlayButtonProps) {
  return (
    <ThemedButton onPress={() => props.setPlaying(!props.isPlaying)}>
      <ThemedIcon name={props.isPlaying ? 'play-outline' : 'pause-outline'} />
    </ThemedButton>
  );
}
