import { BackButton } from '@bassment/components/input/BackButton';
import { ForwardButton } from '@bassment/components/input/ForwardButton';
import { usePlaybackControlsStyles } from '@bassment/components/input/PlaybackControls/PlaybackControls.style';
import { PlayButton } from '@bassment/components/input/PlayButton';
import React from 'react';
import { View } from 'react-native';

interface PlaybackControlsProps {
  isPlaying: boolean;
  setPlaying: (playing: boolean) => void;
  onBack: () => void;
  onForward: () => void;
}

export function PlaybackControls({
  isPlaying,
  setPlaying,
  onBack,
  onForward,
}: PlaybackControlsProps) {
  const styles = usePlaybackControlsStyles();

  return (
    <View style={styles.controls}>
      <BackButton onBack={onBack} />
      <PlayButton isPlaying={isPlaying} setPlaying={setPlaying} />
      <ForwardButton onForward={onForward} />
    </View>
  );
}
