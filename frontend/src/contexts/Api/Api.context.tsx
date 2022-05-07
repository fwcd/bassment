import { Playlist } from '@bassment/models/Playlist';
import React, { createContext, ReactNode } from 'react';

export interface ApiContextValue {
  getPlaylists(): Promise<Playlist[]>;
}

const ApiContext = createContext<ApiContextValue>({
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
    async getPlaylists(): Promise<Playlist[]> {
      // TODO
      return [];
    },
  };
  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
}
