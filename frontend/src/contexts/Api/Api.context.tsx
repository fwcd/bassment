import { networkConstants } from '@bassment/constants';
import { AuthContext } from '@bassment/contexts/Auth';
import { PartialAlbum } from '@bassment/models/Album';
import { PartialArtist } from '@bassment/models/Artist';
import { PartialFileInfo } from '@bassment/models/FileInfo';
import { PartialGenre } from '@bassment/models/Genre';
import { Playlist, PlaylistTreeNode } from '@bassment/models/Playlist';
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

  /** Fetches an artist's tracks with annotations. */
  getAnnotatedArtistTracks(artistId: number): Promise<AnnotatedTrack[]>;

  /** Fetches an album's tracks with annotations. */
  getAnnotatedAlbumTracks(albumId: number): Promise<AnnotatedTrack[]>;

  /** Fetches a genre's tracks with annotations. */
  getAnnotatedGenreTracks(genreId: number): Promise<AnnotatedTrack[]>;

  /** Fetches all playlist trees. */
  getPlaylistTrees(): Promise<PlaylistTreeNode[]>;

  /** Creates a new playlist. */
  postPlaylist(playlist: Playlist): Promise<void>;

  /** Fetches associated audio files for a track. */
  getTrackAudioFiles(trackId: number): Promise<PartialFileInfo[]>;

  /** Fetches the URL for a file by id. */
  getFileDataUrl(fileId: number): string;

  /** Fetches the data for a file by id. */
  getFileData(fileId: number): Promise<ArrayBuffer>;

  /** Uploads a track and lets the server tag it. */
  uploadAutotaggedTrack(fileName: string, data: ArrayBuffer): Promise<void>;
}

function noApiContextSync<T>(resource: string, defaultValue: () => T): () => T {
  return () => {
    console.warn(`No API context available for getting ${resource}!`);
    return defaultValue();
  };
}

function noApiContext<T>(
  resource: string,
  defaultValue: () => T,
): () => Promise<T> {
  return async () => noApiContextSync(resource, defaultValue)();
}

export const ApiContext = createContext<ApiContextValue>({
  isLoggedIn: async () => false,
  getPartialAlbums: noApiContext('partial albums', () => []),
  getPartialArtists: noApiContext('partial artists', () => []),
  getPartialGenres: noApiContext('partial genres', () => []),
  getAnnotatedTracks: noApiContext('annotated tracks', () => []),
  getAnnotatedPlaylistTracks: noApiContext('annotated list tracks', () => []),
  getAnnotatedArtistTracks: noApiContext('annotated artist tracks', () => []),
  getAnnotatedAlbumTracks: noApiContext('annotated album tracks', () => []),
  getAnnotatedGenreTracks: noApiContext('annotated genre tracks', () => []),
  getPlaylistTrees: noApiContext('playlist trees', () => []),
  postPlaylist: noApiContext('playlist', () => {}),
  getTrackAudioFiles: noApiContext('track audio files', () => []),
  getFileData: noApiContext('file data', () => new ArrayBuffer(0)),
  getFileDataUrl: noApiContextSync('file data url', () => ''),
  uploadAutotaggedTrack: noApiContext('autotagged track', () => {}),
});

interface ApiContextProviderProps {
  children: ReactNode;
}

interface ApiUrlOptions {
  includeToken?: boolean;
}

interface ApiRequestOptions {
  contentType?: 'json' | 'multipart';
  acceptedFormat?: 'json' | 'binary';
  body?: any;
}

export function ApiContextProvider(props: ApiContextProviderProps) {
  const auth = useContext(AuthContext);

  const apiUrl = useCallback(
    (endpoint: string, options?: ApiUrlOptions) =>
      `${auth.serverUrl}/api/v1${endpoint}${
        options?.includeToken ? `?token=${auth.token}` : ''
      }`,
    [auth.serverUrl, auth.token],
  );

  const apiRequest = useCallback(
    async (method: string, endpoint: string, options?: ApiRequestOptions) => {
      const acceptedFormat = options?.acceptedFormat ?? 'json';
      let contentType: string = options?.contentType ?? 'json';

      switch (contentType) {
        case 'json':
          contentType = 'application/json';
          break;
        case 'multipart':
          contentType = 'multipart/form-data';
          break;
      }

      const response = await fetch(apiUrl(endpoint), {
        method,
        headers: {
          Authorization: `Bearer ${auth.token!}`,
          'User-Agent': networkConstants.userAgent,
          'Content-Type': contentType,
          ...(acceptedFormat === 'json' ? { Accept: 'application/json' } : {}),
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      if (response.status >= 400) {
        throw Error(
          `API request failed with status ${response.status} ${response.statusText}`,
        );
      }

      switch (acceptedFormat) {
        case 'json':
          return await response.json();
        case 'binary':
          return await response.arrayBuffer();
      }
    },
    [apiUrl, auth.token],
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
    async getAnnotatedArtistTracks(
      artistId: number,
    ): Promise<AnnotatedTrack[]> {
      return await apiRequest('GET', `/artists/${artistId}/tracks/annotated`);
    },
    async getAnnotatedAlbumTracks(albumId: number): Promise<AnnotatedTrack[]> {
      return await apiRequest('GET', `/albums/${albumId}/tracks/annotated`);
    },
    async getAnnotatedGenreTracks(genreId: number): Promise<AnnotatedTrack[]> {
      return await apiRequest('GET', `/genres/${genreId}/tracks/annotated`);
    },
    async getPlaylistTrees(): Promise<PlaylistTreeNode[]> {
      return await apiRequest('GET', '/playlists/trees');
    },
    async postPlaylist(playlist: Playlist): Promise<void> {
      return await apiRequest('POST', '/playlists', { body: playlist });
    },
    async getTrackAudioFiles(trackId: number): Promise<PartialFileInfo[]> {
      return await apiRequest('GET', `/tracks/${trackId}/audios`);
    },
    async getFileData(fileId: number): Promise<ArrayBuffer> {
      return await apiRequest('GET', `/files/${fileId}/data`, {
        acceptedFormat: 'binary',
      });
    },
    getFileDataUrl(fileId: number): string {
      return apiUrl(`/files/${fileId}/data`, {
        includeToken: true,
      });
    },
    async uploadAutotaggedTrack(
      fileName: string,
      data: ArrayBuffer,
    ): Promise<void> {
      const formData = new FormData();
      formData.append('file', new Blob([data]), fileName);
      await apiRequest('POST', '/tracks/autotagged', {
        contentType: 'multipart',
        body: formData,
      });
    },
  };

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
}
