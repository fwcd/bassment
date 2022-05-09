import { AudioPlayer } from '@bassment/components/audio';
import { ApiContext } from '@bassment/contexts/Api';
import { NowPlaying } from '@bassment/models/NowPlaying';
import { TrackQueue } from '@bassment/models/TrackQueue';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface AudioPlayerValue {
  readonly nowPlaying?: NowPlaying;
  isPlaying: boolean;
}

export const AudioPlayerContext = createContext<AudioPlayerValue>({
  isPlaying: false,
});

interface AudioPlayerContextProviderProps {
  children: ReactNode;
}

export function AudioPlayerContextProvider(
  props: AudioPlayerContextProviderProps,
) {
  const api = useContext(ApiContext);
  const [isPlaying, setPlaying] = useState(false);
  const [queue, setQueue] = useState<TrackQueue>({ tracks: [] });
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | undefined>(
    undefined,
  );

  const value: AudioPlayerValue = {
    nowPlaying,
    get isPlaying() {
      return isPlaying;
    },
    set isPlaying(playing: boolean) {
      setPlaying(playing);
    },
  };

  const audioFile = nowPlaying?.track.audios?.find(() => true);

  return (
    <AudioPlayerContext.Provider value={value}>
      {/* TODO: More advanced logic for picking the file, e.g. by quality/file type? */}
      <AudioPlayer
        url={audioFile?.id ? api.getFileDataUrl(audioFile.id) : undefined}
      />
      {props.children}
    </AudioPlayerContext.Provider>
  );
}
