import { PlaybackProgress } from '@bassment/components/combined/PlaybackProgress';
import { usePlaybackViewStyles } from '@bassment/components/combined/PlaybackView/PlaybackView.style';
import { CoverArtView } from '@bassment/components/data/CoverArtView';
import { TrackInfoView } from '@bassment/components/data/TrackInfoView';
import { NowPlaying } from '@bassment/models/NowPlaying';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface PlaybackViewProps {
  nowPlaying?: NowPlaying;
  style?: ViewStyle | ViewStyle[];
}

export function PlaybackView(props: PlaybackViewProps) {
  const styles = usePlaybackViewStyles();
  console.log(props.nowPlaying?.track);

  return (
    <View style={[styles.view, props.style]}>
      <CoverArtView style={styles.coverArt} />
      <View style={styles.playback}>
        {props.nowPlaying ? (
          <>
            <TrackInfoView style={styles.info} track={props.nowPlaying.track} />
            {/* TODO: Proper playback progress data */}
            <PlaybackProgress
              elapsedMs={props.nowPlaying.elapsedMs}
              totalMs={props.nowPlaying.track.durationMs ?? 0}
            />
          </>
        ) : null}
      </View>
    </View>
  );
}
