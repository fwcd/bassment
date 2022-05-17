import { useTrackInfoViewStyles } from '@bassment/components/data/TrackInfoView/TrackInfoView.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { AnnotatedTrack } from '@bassment/models/Track';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface TrackInfoViewProps {
  track: AnnotatedTrack;
  style: ViewStyle | ViewStyle[];
}

export function TrackInfoView({ track, style }: TrackInfoViewProps) {
  const styles = useTrackInfoViewStyles();
  return (
    <View style={[styles.info, style]}>
      <ThemedText style={styles.title}>
        {track.title ?? 'Unnamed Track'}
      </ThemedText>
      <ThemedText>
        {track.artists.flatMap(a => (a.name ? [a.name] : [])).join(', ')}
      </ThemedText>
    </View>
  );
}
