import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { SearchBar } from '@bassment/components/input/SearchBar';
import { AlbumTreeItem } from '@bassment/components/navigation/AlbumTreeItem';
import { ArtistTreeItem } from '@bassment/components/navigation/ArtistTreeItem';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { GenreTreeItem } from '@bassment/components/navigation/GenreTreeItem';
import { PlaylistTreeItem } from '@bassment/components/navigation/PlaylistTreeItem';
import { Divider } from '@bassment/components/structure/Divider';
import { ApiContext } from '@bassment/contexts/Api';
import { SearchContext } from '@bassment/contexts/Search';
import { PartialAlbum } from '@bassment/models/Album';
import { PartialArtist } from '@bassment/models/Artist';
import { PartialGenre } from '@bassment/models/Genre';
import { Playlist, PlaylistTreeNode } from '@bassment/models/Playlist';
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
  const { searchText, setSearchText } = useContext(SearchContext);

  const [playlists, setPlaylists] = useState<PlaylistTreeNode[]>([]);
  const [albums, setAlbums] = useState<PartialAlbum[]>([]);
  const [artists, setArtists] = useState<PartialArtist[]>([]);
  const [genres, setGenres] = useState<PartialGenre[]>([]);

  const updatePlaylists = useCallback(async () => {
    setPlaylists(await api.getPlaylistTrees());
  }, [api]);

  const updateAlbums = useCallback(async () => {
    setAlbums(await api.getPartialAlbums());
  }, [api]);

  const updateArtists = useCallback(async () => {
    setArtists(await api.getPartialArtists());
  }, [api]);

  const updateGenres = useCallback(async () => {
    setGenres(await api.getPartialGenres());
  }, [api]);

  const addPlaylist = useCallback(
    async (playlist: Playlist) => {
      // FIXME: Add playlist via API
      await updatePlaylists();
    },
    [updatePlaylists],
  );

  // Update the playlists, albums etc. on the initial render
  useEffect(() => {
    updatePlaylists();
    updateAlbums();
    updateArtists();
    updateGenres();
  }, [updateAlbums, updateArtists, updateGenres, updatePlaylists]);

  // TODO: Link to TracksScreens with corresponding params for each item (e.g. passing the playlist/album/artist id)

  return (
    <DrawerContentScrollView style={styles.sidebar}>
      <SearchBar value={searchText} onChangeText={setSearchText} />
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
        {artists.map(artist => (
          <ArtistTreeItem key={artist.id} artist={artist} />
        ))}
      </DrawerTreeItem>
      <DrawerTreeItem
        label="Albums"
        icon={({ size, color }) => (
          <ThemedIcon name="albums-outline" size={size} color={color} />
        )}>
        {albums.map(album => (
          <AlbumTreeItem key={album.id} album={album} />
        ))}
      </DrawerTreeItem>
      <DrawerTreeItem
        label="Genres"
        icon={({ size, color }) => (
          <ThemedIcon name="star-outline" size={size} color={color} />
        )}>
        {genres.map(genre => (
          <GenreTreeItem key={genre.id} genre={genre} />
        ))}
      </DrawerTreeItem>
      <DrawerTreeItem
        label="Streams"
        icon={({ size, color }) => (
          // TODO: Implement streams
          <ThemedIcon name="radio-outline" size={size} color={color} />
        )}
      />
      <Divider />
      {playlists.map(playlist => (
        <PlaylistTreeItem key={playlist.id} playlist={playlist} />
      ))}
      <Divider />
      {/* TODO: Implement the buttons */}
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
