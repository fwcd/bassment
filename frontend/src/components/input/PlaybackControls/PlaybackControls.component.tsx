import { usePlaybackControlsStyles } from '@bassment/components/input/PlaybackControls/PlaybackControls.style';
import { PlayButton } from '@bassment/components/input/PlayButton';
import React, { useState } from 'react';
import { View } from 'react-native';

export function PlaybackControls() {
  const styles = usePlaybackControlsStyles();
  const [isPlaying, setPlaying] = useState(false);

  return (
    <View style={styles.controls}>
      <PlayButton isPlaying={isPlaying} setPlaying={setPlaying} />
    </View>
  );
}
