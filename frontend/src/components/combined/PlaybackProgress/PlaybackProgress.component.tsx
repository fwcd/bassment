import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { usePlaybackProgressStyles } from '@bassment/components/combined/PlaybackProgress/PlaybackProgress.style';

interface PlaybackProgressProps {
  elapsedMs: number;
  totalMs: number;
  onSeek?: (elapsedMs: number) => void;
}

export function PlaybackProgress(props: PlaybackProgressProps) {
  const styles = usePlaybackProgressStyles();

  return (
    <Slider
      // TODO: Handle change
      value={props.elapsedMs}
      minimumValue={0}
      maximumValue={props.totalMs}
      onValueChange={event => {
        const value = typeof event === 'number' ? event : event[0];
        if (props.onSeek) {
          props.onSeek(value);
        }
      }}
      containerStyle={styles.slider}
      thumbTouchSize={{ width: 10, height: 10 }}
    />
  );
}
