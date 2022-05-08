import { networkConstants } from '@bassment/constants';
import { AuthContext } from '@bassment/contexts/Auth';
import { PartialAlbum } from '@bassment/models/Album';
import { PartialArtist } from '@bassment/models/Artist';
import { PartialGenre } from '@bassment/models/Genre';
import { PlaylistTreeNode } from '@bassment/models/Playlist';
import { AnnotatedTrack } from '@bassment/models/Track';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from 'react';

export interface ApiContextValue {
  // TODO: Filtering, (batch) by-ID querying etc.

  // TODO: Move the isLoggedIn route to the /auth/v1
  //       routes in the backend and make it always
  //       return a result, e.g. a boolean (instead
  //       of relying on the 401 to detect the unauthorized
  //       case).

  /**
   * Checks whether the user is logged in (or the
   * server permits unauthenticated access) by pinging
   * the API.
   */
  isLoggedIn(): Promise<boolean>;

  /** Fetches all artists (as partial structures). */
  getPartialArtists(): Promise<PartialArtist[]>;

  /** Fetches all albums (as partial structures). */
  getPartialAlbums(): Promise<PartialAlbum[]>;

  /** Fetches all genres (as partial structures). */
  getPartialGenres(): Promise<PartialGenre[]>;

  /** Fetches all tracks with artist/album/genre annotations. */
  getAnnotatedTracks(): Promise<AnnotatedTrack[]>;

  /** Fetches a playlist's tracks with annotations. */
  getAnnotatedPlaylistTracks(playlistId: number): Promise<AnnotatedTrack[]>;

  /** Fetches all playlist trees. */
  getPlaylistTrees(): Promise<PlaylistTreeNode[]>;
}

function noApiContext<T>(
  resource: string,
  defaultValue: () => T,
): () => Promise<T> {
  return async () => {
    console.warn(`No API context available for getting ${resource}!`);
    return defaultValue();
  };
}

export const ApiContext = createContext<ApiContextValue>({
  isLoggedIn: async () => false,
  getPartialAlbums: noApiContext('partial albums', () => []),
  getPartialArtists: noApiContext('partial artists', () => []),
  getPartialGenres: noApiContext('partial genres', () => []),
  getAnnotatedTracks: noApiContext('annotated tracks', () => []),
  getAnnotatedPlaylistTracks: noApiContext('annotated list tracks', () => []),
  getPlaylistTrees: noApiContext('playlist trees', () => []),
});

interface ApiContextProviderProps {
  children: ReactNode;
}

export function ApiContextProvider(props: ApiContextProviderProps) {
  const auth = useContext(AuthContext);

  const apiRequest = useCallback(
    async (method: string, endpoint: string, body?: any) => {
      const response = await fetch(`${auth.serverUrl}/api/v1${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${auth.token!}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': networkConstants.userAgent,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (response.status >= 400) {
        throw Error(
          `API request failed with status ${response.status} ${response.statusText}`,
        );
      }
      return await response.json();
    },
    [auth.serverUrl, auth.token],
  );

  const value: ApiContextValue = {
    async isLoggedIn(): Promise<boolean> {
      try {
        await apiRequest('GET', '/ping');
        return true;
      } catch {
        return false;
      }
    },
    async getPartialArtists(): Promise<PartialArtist[]> {
      return await apiRequest('GET', '/artists/partial');
    },
    async getPartialAlbums(): Promise<PartialAlbum[]> {
      return await apiRequest('GET', '/albums/partial');
    },
    async getPartialGenres(): Promise<PartialGenre[]> {
      return await apiRequest('GET', '/genres/partial');
    },
    async getAnnotatedTracks(): Promise<AnnotatedTrack[]> {
      return await apiRequest('GET', '/tracks/annotated');
    },
    async getAnnotatedPlaylistTracks(
      playlistId: number,
    ): Promise<AnnotatedTrack[]> {
      return await apiRequest(
        'GET',
        `/playlists/${playlistId}/tracks/annotated`,
      );
    },
    async getPlaylistTrees(): Promise<PlaylistTreeNode[]> {
      return await apiRequest('GET', '/playlists/trees');
    },
  };

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
}
