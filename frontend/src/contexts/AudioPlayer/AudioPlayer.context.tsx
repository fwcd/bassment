import { AudioPlayer } from '@bassment/components/audio';
import { ApiContext } from '@bassment/contexts/Api';
import { NowPlaying } from '@bassment/models/NowPlaying';
import { TrackQueue } from '@bassment/models/TrackQueue';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

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

  const trackId = nowPlaying?.track.id;
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  const updateAudioUrl = useCallback(async () => {
    // TODO: More advanced logic for picking the file, e.g. by quality/file type?

    const audioFiles = trackId ? await api.getTrackAudioFiles(trackId) : [];
    const audioFile = audioFiles.find(() => true);
    const newAudioUrl = audioFile?.id
      ? api.getFileDataUrl(audioFile.id)
      : undefined;

    setAudioUrl(newAudioUrl);
  }, [api, trackId]);

  useEffect(() => {
    updateAudioUrl();
  }, [updateAudioUrl, trackId]);

  return (
    <AudioPlayerContext.Provider value={value}>
      <AudioPlayer url={audioUrl} />
      {props.children}
    </AudioPlayerContext.Provider>
  );
}
