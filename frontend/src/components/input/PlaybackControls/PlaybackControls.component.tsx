import { BackButton } from '@bassment/components/input/BackButton';
import { ForwardButton } from '@bassment/components/input/ForwardButton';
import { usePlaybackControlsStyles } from '@bassment/components/input/PlaybackControls/PlaybackControls.style';
import { PlayButton } from '@bassment/components/input/PlayButton';
import React, { useState } from 'react';
import { View } from 'react-native';

export function PlaybackControls() {
  const styles = usePlaybackControlsStyles();
  const [isPlaying, setPlaying] = useState(false);

  return (
    <View style={styles.controls}>
      <BackButton onBack={() => {}} />
      <PlayButton isPlaying={isPlaying} setPlaying={setPlaying} />
      <ForwardButton onForward={() => {}} />
    </View>
  );
}
