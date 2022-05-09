import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { usePlaybackProgressStyles } from '@bassment/components/extended/PlaybackProgress/PlaybackProgress.style';

interface PlaybackProgressProps {}

export function PlaybackProgress(props: PlaybackProgressProps) {
  const styles = usePlaybackProgressStyles();

  return (
    <Slider
      containerStyle={styles.slider}
      thumbTouchSize={{ width: 10, height: 10 }}
    />
  );
}
