import { AudioPlayer } from '@bassment/components/audio';
import React, { createContext, ReactNode, useState } from 'react';

export interface AudioPlayerValue {}

export const AudioPlayerContext = createContext<AudioPlayerValue>({});

interface AudioPlayerContextProviderProps {
  children: ReactNode;
}

export function AudioPlayerContextProvider(
  props: AudioPlayerContextProviderProps,
) {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const value: AudioPlayerValue = {};

  return (
    <AudioPlayerContext.Provider value={value}>
      <AudioPlayer url={url} />
      {props.children}
    </AudioPlayerContext.Provider>
  );
}
