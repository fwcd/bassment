import { AudioPlayer } from '@bassment/components/audio/AudioPlayer';
import { ApiContext } from '@bassment/contexts/Api';
import { NowPlaying } from '@bassment/models/NowPlaying';
import { AnnotatedTrack } from '@bassment/models/Track';
import { TrackQueue } from '@bassment/models/TrackQueue';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface AudioPlayerContextValue {
  /** The currently playing track and playback state. */
  readonly nowPlaying?: NowPlaying;
  /** Whether playback is active. */
  isPlaying: boolean;

  /** Plays the given track immediately. */
  play(track: AnnotatedTrack): void;

  /** Seeks to the given offset in the current track. */
  seek(elapsedMs: number): void;
}

export const AudioPlayerContext = createContext<AudioPlayerContextValue>({
  isPlaying: false,
  play: () => {},
  seek: () => {},
});

interface AudioPlayerContextProviderProps {
  children: ReactNode;
}

export function AudioPlayerContextProvider(
  props: AudioPlayerContextProviderProps,
) {
  const api = useContext(ApiContext);

  // TODO: Use queue
  const [queue, setQueue] = useState<TrackQueue>({ tracks: [] });
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [totalMs, setTotalMs] = useState<number>(0);
  const [seekMs, setSeekMs] = useState<number>();
  const [track, setTrack] = useState<AnnotatedTrack>();
  const [audioUrl, setAudioUrl] = useState<string>();

  const value: AudioPlayerContextValue = {
    nowPlaying: track ? { track, elapsedMs, totalMs } : undefined,

    get isPlaying() {
      return isPlaying;
    },

    set isPlaying(playing: boolean) {
      setPlaying(playing);
    },

    play(newTrack: AnnotatedTrack): void {
      setTrack(newTrack);
      setSeekMs(0);
      setPlaying(true);
    },

    seek(newSeekMs: number): void {
      setSeekMs(newSeekMs);
    },
  };

  const updateAudioUrl = useCallback(async () => {
    // TODO: More advanced logic for picking the file, e.g. by quality/file type?
    const audioFiles = track?.id ? await api.getTrackAudioFiles(track.id) : [];
    const audioFile = audioFiles.find(() => true);
    const newAudioUrl = audioFile?.id
      ? api.getFileDataUrl(audioFile.id)
      : undefined;

    setAudioUrl(newAudioUrl);
    setPlaying(newAudioUrl !== undefined);
  }, [api, track]);

  // Update the audio buffer whenever the current track changes
  useEffect(() => {
    updateAudioUrl();
  }, [updateAudioUrl]);

  const updateElapsedMs = useCallback((newElapsedMs: number) => {
    setElapsedMs(newElapsedMs);
    setSeekMs(undefined);
  }, []);

  return (
    <AudioPlayerContext.Provider value={value}>
      <AudioPlayer
        isPlaying={isPlaying}
        url={audioUrl}
        seekMs={seekMs}
        onUpdatePlaying={setPlaying}
        onUpdateElapsedMs={updateElapsedMs}
        onUpdateTotalMs={setTotalMs}
      />
      {props.children}
    </AudioPlayerContext.Provider>
  );
}
