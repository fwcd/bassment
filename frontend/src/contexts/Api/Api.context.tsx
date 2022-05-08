import { networkConstants } from '@bassment/constants';
import { AuthContext } from '@bassment/contexts/Auth';
import { PlaylistTreeNode } from '@bassment/models/Playlist';
import { Track } from '@bassment/models/Track';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from 'react';

export interface ApiContextValue {
  // TODO: Filtering, (batch) by-ID querying etc.

  /** Fetches all tracks. */
  getTracks(): Promise<Track[]>;

  /** Fetches all playlist trees. */
  getPlaylistTrees(): Promise<PlaylistTreeNode[]>;
}

export const ApiContext = createContext<ApiContextValue>({
  async getTracks(): Promise<Track[]> {
    console.warn('No API context available for getting tracks!');
    return [];
  },

  async getPlaylistTrees(): Promise<PlaylistTreeNode[]> {
    console.warn('No API context available for getting playlist trees!');
    return [];
  },
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
    async getTracks(): Promise<Track[]> {
      return await apiRequest('GET', '/tracks');
    },

    async getPlaylistTrees(): Promise<PlaylistTreeNode[]> {
      return await apiRequest('GET', '/playlists/trees');
    },
  };

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
}
