import { useTrackInfoViewStyles } from '@bassment/components/data/TrackInfoView/TrackInfoView.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { AnnotatedTrack } from '@bassment/models/Track';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface TrackInfoViewProps {
  track: AnnotatedTrack;
  style: ViewStyle | ViewStyle[];
}

export function TrackInfoView(props: TrackInfoViewProps) {
  const styles = useTrackInfoViewStyles();
  return (
    <View style={[styles.info, props.style]}>
      <ThemedText style={styles.title}>
        {props.track.title ?? 'Unnamed Track'}
      </ThemedText>
      <ThemedText>
        {props.track.artists.flatMap(a => (a.name ? [a.name] : [])).join(', ')}
      </ThemedText>
    </View>
  );
}
