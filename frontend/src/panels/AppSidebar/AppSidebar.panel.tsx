import { SidebarNavigatorParams } from '@bassment/AppContainer';
import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { SearchBar } from '@bassment/components/input/SearchBar';
import { AlbumTreeItem } from '@bassment/components/navigation/AlbumTreeItem';
import { ArtistTreeItem } from '@bassment/components/navigation/ArtistTreeItem';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PlaylistTreeItem } from '@bassment/components/navigation/PlaylistTreeItem';
import { Divider } from '@bassment/components/structure/Divider';
import { ApiContext } from '@bassment/contexts/Api';
import { SearchContext } from '@bassment/contexts/Search';
import { PartialAlbum } from '@bassment/models/Album';
import { PartialArtist } from '@bassment/models/Artist';
import { Playlist, PlaylistTreeNode } from '@bassment/models/Playlist';
import { PlaylistKind } from '@bassment/models/PlaylistKind';
import { useAppSidebarStyles } from '@bassment/panels/AppSidebar/AppSidebar.style';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { CategoryTreeNode } from '@bassment/models/Category';
import { CategoryTreeItem } from '@bassment/components/navigation/CategoryTreeItem';
import { QueueTreeItem } from '@bassment/components/navigation/QueueTreeItem';
import { AudioPlayerContext } from '@bassment/contexts/AudioPlayer';
import { HistoryTreeItem } from '@bassment/components/navigation/HistoryTreeItem';
import { AnnotatedTrack } from '@bassment/models/Track';
import { SectionHeader } from '@bassment/components/structure/SectionHeader';

export function AppSidebar(props: DrawerContentComponentProps) {
  const route = props.state.routes[props.state.index];
  const navigation: NavigationProp<SidebarNavigatorParams> = useNavigation();
  const styles = useAppSidebarStyles();

  const player = useContext(AudioPlayerContext);
  const api = useContext(ApiContext);
  const { searchText, setSearchText } = useContext(SearchContext);

  const [playlists, setPlaylists] = useState<PlaylistTreeNode[]>([]);
  const [categories, setCategories] = useState<CategoryTreeNode[]>([]);
  const [albums, setAlbums] = useState<PartialAlbum[]>([]);
  const [artists, setArtists] = useState<PartialArtist[]>([]);
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

  const updateCategories = useCallback(async () => {
    setCategories(await api.getCategoryTrees());
  }, [api]);

  const createNewPlaylist = useCallback(
    (kind: PlaylistKind) => {
      setNewPlaylist({
        kind,
        name: '',
        position: Math.max(0, ...playlists.map(p => p.position ?? 0)) + 1,
      });
    },
    [playlists],
  );

  const addNewPlaylist = useCallback(async () => {
    if (newPlaylist) {
      await api.postPlaylist(newPlaylist);
      await updatePlaylists();
      setNewPlaylist(undefined);
    }
  }, [api, newPlaylist, updatePlaylists]);

  const onInsertPlaylistTracks = useCallback(
    async (playlistId: number, tracks: AnnotatedTrack[]) => {
      await api.postPlaylistTrackIds(
        playlistId,
        tracks.flatMap(t => (t.id ? [t.id] : [])),
      );
    },
    [api],
  );

  const onDeletePlaylist = useCallback(
    async (playlist: Playlist) => {
      if (playlist.id) {
        await api.deletePlaylist(playlist.id);
        await updatePlaylists();
      }
    },
    [api, updatePlaylists],
  );

  // Update the playlists, albums etc. on the initial render
  useEffect(() => {
    updatePlaylists();
    updateAlbums();
    updateArtists();
    updateCategories();
  }, [updateAlbums, updateArtists, updateCategories, updatePlaylists]);

  return (
    <DrawerContentScrollView style={styles.sidebar}>
      <SearchBar value={searchText} onChangeText={setSearchText} />
      <SectionHeader label="Library" />
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
                displayName: artist.name ?? `${artist.id}`,
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
                displayName: album.name ?? `${album.id}`,
              })
            }
          />
        ))}
      </DrawerTreeItem>
      <Divider />
      <SectionHeader label="Categories" />
      {categories.map(category => (
        <CategoryTreeItem
          key={category.id}
          category={category}
          focusedTagId={
            route.name === 'tag'
              ? (route.params as SidebarNavigatorParams['tag']).id
              : undefined
          }
          onFocusTag={tag => {
            navigation.navigate('tag', {
              id: tag.id!,
              displayName: category.displayName,
              displayValue: tag.value,
            });
          }}
        />
      ))}
      {/* TODO: Implement streams
      <DrawerTreeItem
        label="Streams"
        icon={({ size, color }) => (
          <ThemedIcon name="radio-outline" size={size} color={color} />
        )}
      /> */}
      <Divider />
      <SectionHeader label="Playback" />
      <QueueTreeItem
        count={player.queue?.tracks.length ?? 0}
        isFocused={route.name === 'queue'}
        onFocus={() => navigation.navigate('queue', {})}
        onEnqueue={player.enqueue}
      />
      <HistoryTreeItem
        isFocused={route.name === 'history'}
        onFocus={() => navigation.navigate('history', {})}
      />
      <Divider />
      <SectionHeader label="Playlists" />
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
              displayName: child.name ?? `${playlist.id}`,
            })
          }
          onInsert={onInsertPlaylistTracks}
          onDelete={onDeletePlaylist}
        />
      ))}
      {/* TODO: Add context menus and let user insert playlists e.g. in folders */}
      {newPlaylist ? (
        <PlaylistTreeItem
          playlist={newPlaylist}
          onEdit={setNewPlaylist}
          onSubmitEdit={addNewPlaylist}
          isEditable
          isEditFocused
        />
      ) : null}
      <Divider />
      <DrawerTreeItem
        label="Add Playlist"
        isButton
        onPress={() => {
          createNewPlaylist(PlaylistKind.Playlist);
        }}
        icon={({ size, color }) => (
          <ThemedIcon name="add-outline" size={size} color={color} />
        )}
      />
      <DrawerTreeItem
        label="Add Folder"
        isButton
        onPress={() => {
          createNewPlaylist(PlaylistKind.Folder);
        }}
        icon={({ size, color }) => (
          <ThemedIcon name="add-outline" size={size} color={color} />
        )}
      />
      {/* TODO: Add button for adding new categories */}
    </DrawerContentScrollView>
  );
}
