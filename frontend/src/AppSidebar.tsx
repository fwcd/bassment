import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { SearchBar } from '@bassment/components/input/SearchBar';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PlaylistTreeItem } from '@bassment/components/navigation/PlaylistTreeItem';
import { Divider } from '@bassment/components/structure/Divider';
import { ApiContext } from '@bassment/contexts/Api';
import { Playlist } from '@bassment/models/Playlist';
import { useStyles } from '@bassment/styles';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export function AppSidebar(props: DrawerContentComponentProps) {
  const routeName = props.state.routeNames[props.state.index];
  const globalStyles = useStyles();
  const styles = StyleSheet.create({
    sidebar: {
      marginHorizontal: globalStyles.layout.smallSpace,
    },
  });

  const api = useContext(ApiContext);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const updatePlaylists = useCallback(async () => {
    setPlaylists(await api.getPlaylists());
  }, [api]);

  const addPlaylist = useCallback(
    async (playlist: Playlist) => {
      // FIXME: Add playlist via API
      await updatePlaylists();
    },
    [updatePlaylists],
  );

  // Update the playlists on the initial render
  useEffect(() => {
    updatePlaylists();
  }, [updatePlaylists]);

  return (
    <DrawerContentScrollView style={styles.sidebar}>
      <SearchBar />
      <DrawerTreeItem
        label="Tracks"
        icon={({ size, color }) => (
          <ThemedIcon name="musical-notes-outline" size={size} color={color} />
        )}
        focused={routeName === 'Tracks'}
        onPress={() => {
          props.navigation.navigate('Tracks');
        }}
      />
      <DrawerTreeItem
        label="Artists"
        icon={({ size, color }) => (
          <ThemedIcon name="person-outline" size={size} color={color} />
        )}>
        <DrawerTreeItem label="Pop" onPress={() => {}} />
        <DrawerTreeItem label="House" onPress={() => {}} />
      </DrawerTreeItem>
      <DrawerTreeItem
        label="Albums"
        icon={({ size, color }) => (
          <ThemedIcon name="albums-outline" size={size} color={color} />
        )}>
        <DrawerTreeItem label="Test 1" onPress={() => {}} />
        <DrawerTreeItem label="Test 2">
          <DrawerTreeItem label="Nested 1" onPress={() => {}} />
        </DrawerTreeItem>
        <DrawerTreeItem label="Test 3" onPress={() => {}} />
      </DrawerTreeItem>
      <DrawerTreeItem
        label="Genres"
        icon={({ size, color }) => (
          <ThemedIcon name="star-outline" size={size} color={color} />
        )}>
        <DrawerTreeItem label="Pop" onPress={() => {}} />
        <DrawerTreeItem label="House" onPress={() => {}} />
      </DrawerTreeItem>
      <DrawerTreeItem
        label="Streams"
        icon={({ size, color }) => (
          <ThemedIcon name="radio-outline" size={size} color={color} />
        )}
      />
      <Divider />
      {playlists.map(p => (
        <PlaylistTreeItem playlist={p} />
      ))}
      <Divider />
      <DrawerTreeItem
        label="Add Playlist"
        isButton
        icon={({ size, color }) => (
          <ThemedIcon name="add-outline" size={size} color={color} />
        )}
      />
      <DrawerTreeItem
        label="Add Folder"
        isButton
        icon={({ size, color }) => (
          <ThemedIcon name="add-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}
