import { Playlist } from '@bassment/models/Playlist';
import { Track } from '@bassment/models/Track';
import React, { createContext, ReactNode } from 'react';

export interface ApiContextValue {
  // TODO: Filtering, (batch) by-ID querying etc.

  /** Fetches all tracks. */
  getTracks(): Promise<Track[]>;

  /** Fetches all playlists. */
  getPlaylists(): Promise<Playlist[]>;
}

const ApiContext = createContext<ApiContextValue>({
  async getTracks(): Promise<Track[]> {
    console.warn('No API context available for getting tracks!');
    return [];
  },

  async getPlaylists(): Promise<Playlist[]> {
    console.warn('No API context available for getting playlists!');
    return [];
  },
});

interface ApiContextProviderProps {
  children: ReactNode;
}

export function ApiContextProvider(props: ApiContextProviderProps) {
  const value: ApiContextValue = {
    async getTracks(): Promise<Track[]> {
      // TODO
      return [];
    },
    async getPlaylists(): Promise<Playlist[]> {
      // TODO
      return [];
    },
  };
  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
}
