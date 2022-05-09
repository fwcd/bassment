import { CoverArtView } from '@bassment/components/data/CoverArtView';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { usePlaybackViewStyles } from '@bassment/components/extended/PlaybackView/PlaybackView.style';
import { AnnotatedTrack } from '@bassment/models/Track';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface PlaybackViewProps {
  track: AnnotatedTrack;
  style?: ViewStyle | ViewStyle[];
}

export function PlaybackView(props: PlaybackViewProps) {
  const styles = usePlaybackViewStyles();

  return (
    <View style={[styles.view, props.style]}>
      <CoverArtView style={styles.coverArt} />
      <View style={[styles.info]}>
        <ThemedText>{props.track.name ?? 'Unnamed Track'}</ThemedText>
      </View>
    </View>
  );
}
