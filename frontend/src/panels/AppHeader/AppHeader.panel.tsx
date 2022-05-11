import { ThemedText } from '@bassment/components/display/ThemedText';
import { PlaybackView } from '@bassment/components/combined/PlaybackView';
import { PlaybackControls } from '@bassment/components/input/PlaybackControls';
import { AudioPlayerContext } from '@bassment/contexts/AudioPlayer';
import { useAppHeaderStyles } from '@bassment/panels/AppHeader/AppHeader.style';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function AppHeader(props: DrawerHeaderProps) {
  const styles = useAppHeaderStyles();
  const player = useContext(AudioPlayerContext);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={[styles.item, styles.sideItem]}>
          <PlaybackControls
            isPlaying={player.isPlaying}
            setPlaying={player.setPlaying}
          />
        </View>
        <PlaybackView
          style={[styles.item, styles.playback]}
          nowPlaying={player.nowPlaying}
          onSeek={player.seek}
        />
        <ThemedText style={[styles.item, styles.sideItem, styles.title]}>
          {props.options.headerTitle ?? props.options.title ?? props.route.name}
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}
