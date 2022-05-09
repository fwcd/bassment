import { CoverArtView } from '@bassment/components/data/CoverArtView';
import { TrackInfoView } from '@bassment/components/data/TrackInfoView';
import { PlaybackProgress } from '@bassment/components/extended/PlaybackProgress';
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
      <View style={styles.playback}>
        <TrackInfoView style={styles.info} track={props.track} />
        <PlaybackProgress />
      </View>
    </View>
  );
}
