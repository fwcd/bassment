import React, { createContext, ReactNode } from 'react';

export interface AudioPlayerValue {}

export const AudioPlayerContext = createContext<AudioPlayerValue>({});

interface AudioPlayerContextProviderProps {
  children: ReactNode;
}

export function AudioPlayerContextProvider(
  props: AudioPlayerContextProviderProps,
) {
  const value: AudioPlayerValue = {};

  return (
    <AudioPlayerContext.Provider value={value}>
      {props.children}
    </AudioPlayerContext.Provider>
  );
}
