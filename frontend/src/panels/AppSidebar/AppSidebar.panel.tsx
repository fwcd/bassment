import { SidebarNavigatorParams } from '@bassment/AppContainer';
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
import { PlaylistKind } from '@bassment/models/PlaylistKind';
import { useAppSidebarStyles } from '@bassment/panels/AppSidebar/AppSidebar.style';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';

export function AppSidebar(props: DrawerContentComponentProps) {
  const route = props.state.routes[props.state.index];
  const navigation: NavigationProp<SidebarNavigatorParams> = useNavigation();
  const styles = useAppSidebarStyles();

  const api = useContext(ApiContext);
  const { searchText, setSearchText } = useContext(SearchContext);

  const [playlists, setPlaylists] = useState<PlaylistTreeNode[]>([]);
  const [albums, setAlbums] = useState<PartialAlbum[]>([]);
  const [artists, setArtists] = useState<PartialArtist[]>([]);
  const [genres, setGenres] = useState<PartialGenre[]>([]);
  const [newPlaylist, setNewPlaylist] = useState<Playlist>();

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
        isFocused={route.name === 'tracks'}
        onPress={() => {
          navigation.navigate('tracks', {});
        }}
      />
      <DrawerTreeItem
        label="Artists"
        icon={({ size, color }) => (
          <ThemedIcon name="person-outline" size={size} color={color} />
        )}>
        {artists.map(artist => (
          <ArtistTreeItem
            key={artist.id}
            artist={artist}
            isFocused={
              route.name === 'artist' &&
              (route.params as SidebarNavigatorParams['artist']).id ===
                artist.id
            }
            onFocus={() =>
              navigation.navigate('artist', {
                id: artist.id!,
                name: artist.name ?? `${artist.id}`,
              })
            }
          />
        ))}
      </DrawerTreeItem>
      <DrawerTreeItem
        label="Albums"
        icon={({ size, color }) => (
          <ThemedIcon name="albums-outline" size={size} color={color} />
        )}>
        {albums.map(album => (
          <AlbumTreeItem
            key={album.id}
            album={album}
            isFocused={
              route.name === 'album' &&
              (route.params as SidebarNavigatorParams['album']).id === album.id
            }
            onFocus={() =>
              navigation.navigate('album', {
                id: album.id!,
                name: album.name ?? `${album.id}`,
              })
            }
          />
        ))}
      </DrawerTreeItem>
      <DrawerTreeItem
        label="Genres"
        icon={({ size, color }) => (
          <ThemedIcon name="star-outline" size={size} color={color} />
        )}>
        {genres.map(genre => (
          <GenreTreeItem
            key={genre.id}
            genre={genre}
            isFocused={
              route.name === 'genre' &&
              (route.params as SidebarNavigatorParams['genre']).id === genre.id
            }
            onFocus={() =>
              navigation.navigate('genre', {
                id: genre.id!,
                name: genre.name ?? `${genre.id}`,
              })
            }
          />
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
        <PlaylistTreeItem
          key={playlist.id}
          playlist={playlist}
          focusedId={
            route.name === 'playlist'
              ? (route.params as SidebarNavigatorParams['playlist']).id
              : undefined
          }
          onFocus={child =>
            navigation.navigate('playlist', {
              id: child.id!,
              name: child.name ?? `${playlist.id}`,
            })
          }
        />
      ))}
      {/* TODO: Add context menus and let user insert playlists e.g. in folders */}
      {newPlaylist ? (
        <PlaylistTreeItem
          playlist={newPlaylist}
          onEdit={setNewPlaylist}
          isEditable
          isEditFocused
        />
      ) : null}
      <Divider />
      {/* TODO: Implement the buttons */}
      <DrawerTreeItem
        label="Add Playlist"
        isButton
        onPress={() => {
          setNewPlaylist({ kind: PlaylistKind.Playlist });
        }}
        icon={({ size, color }) => (
          <ThemedIcon name="add-outline" size={size} color={color} />
        )}
      />
      <DrawerTreeItem
        label="Add Folder"
        isButton
        onPress={() => {
          setNewPlaylist({ kind: PlaylistKind.Crate });
        }}
        icon={({ size, color }) => (
          <ThemedIcon name="add-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}
