import { BackButton } from '@bassment/components/input/BackButton';
import { ForwardButton } from '@bassment/components/input/ForwardButton';
import { usePlaybackControlsStyles } from '@bassment/components/input/PlaybackControls/PlaybackControls.style';
import { PlayButton } from '@bassment/components/input/PlayButton';
import React from 'react';
import { View } from 'react-native';

interface PlaybackControlsProps {
  isPlaying: boolean;
  setPlaying: (playing: boolean) => void;
}

export function PlaybackControls(props: PlaybackControlsProps) {
  const styles = usePlaybackControlsStyles();

  return (
    <View style={styles.controls}>
      <BackButton onBack={() => {}} />
      <PlayButton isPlaying={props.isPlaying} setPlaying={props.setPlaying} />
      <ForwardButton onForward={() => {}} />
    </View>
  );
}
