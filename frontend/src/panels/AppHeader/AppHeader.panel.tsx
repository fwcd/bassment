import { ThemedText } from '@bassment/components/display/ThemedText';
import { PlaybackControls } from '@bassment/components/input/PlaybackControls';
import { useAppHeaderStyles } from '@bassment/panels/AppHeader/AppHeader.style';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';

export function AppHeader(props: DrawerHeaderProps) {
  const styles = useAppHeaderStyles();

  return (
    <View style={styles.header}>
      <View style={styles.item}>
        <PlaybackControls />
      </View>
      <View style={styles.item}>
        <ThemedText style={styles.title}>
          {props.options.headerTitle ?? props.options.title ?? props.route.name}
        </ThemedText>
      </View>
    </View>
  );
}
