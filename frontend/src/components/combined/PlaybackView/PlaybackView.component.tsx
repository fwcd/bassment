import { PlaybackProgress } from '@bassment/components/combined/PlaybackProgress';
import { usePlaybackViewStyles } from '@bassment/components/combined/PlaybackView/PlaybackView.style';
import { CoverArtView } from '@bassment/components/data/CoverArtView';
import { TrackInfoView } from '@bassment/components/data/TrackInfoView';
import { NowPlaying } from '@bassment/models/NowPlaying';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface PlaybackViewProps {
  nowPlaying?: NowPlaying;
  onSeek?: (elapsedMs: number) => void;
  style?: ViewStyle | ViewStyle[];
}

export function PlaybackView(props: PlaybackViewProps) {
  const styles = usePlaybackViewStyles();

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
              totalMs={props.nowPlaying.totalMs}
              onSeek={props.onSeek}
            />
          </>
        ) : null}
      </View>
    </View>
  );
}
