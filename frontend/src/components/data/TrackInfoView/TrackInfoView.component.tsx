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
      <ThemedText>{props.track.name ?? 'Unnamed Track'}</ThemedText>
      <ThemedText>{props.track.artists.join(', ')}</ThemedText>
    </View>
  );
}
