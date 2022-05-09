import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { usePlaybackProgressStyles } from '@bassment/components/extended/PlaybackProgress/PlaybackProgress.style';

interface PlaybackProgressProps {
  elapsedMs: number;
  totalMs: number;
}

export function PlaybackProgress(props: PlaybackProgressProps) {
  const styles = usePlaybackProgressStyles();

  return (
    <Slider
      // TODO: Handle change
      value={props.elapsedMs}
      minimumValue={0}
      maximumValue={props.totalMs}
      containerStyle={styles.slider}
      thumbTouchSize={{ width: 10, height: 10 }}
    />
  );
}