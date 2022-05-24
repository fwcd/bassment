import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { usePlaybackProgressStyles } from '@bassment/components/combined/PlaybackProgress/PlaybackProgress.style';

interface PlaybackProgressProps {
  elapsedMs: number;
  totalMs: number;
  onSeek?: (elapsedMs: number) => void;
}

export function PlaybackProgress({
  elapsedMs,
  totalMs,
  onSeek,
}: PlaybackProgressProps) {
  const styles = usePlaybackProgressStyles();

  return (
    <Slider
      value={elapsedMs}
      minimumValue={0}
      maximumValue={totalMs}
      onValueChange={event => {
        const value = typeof event === 'number' ? event : event[0];
        if (onSeek) {
          onSeek(value);
        }
      }}
      // For some reason we can't use a StyleSheet object here, so we do it inline
      thumbStyle={{ width: 5, height: 5 }}
      containerStyle={styles.slider}
    />
  );
}
