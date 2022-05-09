import { ThemedText } from '@bassment/components/display/ThemedText';
import { PlayButton } from '@bassment/components/input/PlayButton';
import { useAppHeaderStyles } from '@bassment/panels/AppHeader/AppHeader.style';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { View } from 'react-native';

export function AppHeader(props: DrawerHeaderProps) {
  const styles = useAppHeaderStyles();
  const [isPlaying, setPlaying] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.item}>
        <PlayButton isPlaying={isPlaying} setPlaying={setPlaying} />
      </View>
      <View style={styles.item}>
        <ThemedText style={styles.title}>
          {props.options.headerTitle ?? props.options.title ?? props.route.name}
        </ThemedText>
      </View>
    </View>
  );
}
