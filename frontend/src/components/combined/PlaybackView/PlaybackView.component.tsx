import { PlaybackProgress } from '@bassment/components/combined/PlaybackProgress';
import { usePlaybackViewStyles } from '@bassment/components/combined/PlaybackView/PlaybackView.style';
import { CoverArtView } from '@bassment/components/data/CoverArtView';
import { TrackInfoView } from '@bassment/components/data/TrackInfoView';
import { NowPlaying } from '@bassment/models/NowPlaying';
import React, { memo } from 'react';
import { View, ViewStyle } from 'react-native';

interface PlaybackViewProps {
  nowPlaying?: NowPlaying;
  onSeek?: (elapsedMs: number) => void;
  style?: ViewStyle | ViewStyle[];
}

export const PlaybackView = memo(
  ({ nowPlaying, onSeek, style }: PlaybackViewProps) => {
    const styles = usePlaybackViewStyles();

    return (
      <View style={[styles.view, style]}>
        <CoverArtView style={styles.coverArt} />
        <View style={styles.playback}>
          {nowPlaying ? (
            <>
              <TrackInfoView style={styles.info} track={nowPlaying.track} />
              <PlaybackProgress
                elapsedMs={nowPlaying.elapsedMs}
                totalMs={nowPlaying.totalMs}
                onSeek={onSeek}
              />
            </>
          ) : null}
        </View>
      </View>
    );
  },
);
