import { AudioPlayer } from '@bassment/audio/AudioPlayer';
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
  useRef,
  useState,
} from 'react';

export interface AudioPlayerContextValue {
  /** The currently playing track and playback state. */
  readonly nowPlaying?: NowPlaying;
  /** Whether playback is active. */
  isPlaying: boolean;

  /** Plays the given track immediately. */
  play(track: AnnotatedTrack): void;
}

export const AudioPlayerContext = createContext<AudioPlayerContextValue>({
  isPlaying: false,
  play: () => {},
});

interface AudioPlayerContextProviderProps {
  children: ReactNode;
}

export function AudioPlayerContextProvider(
  props: AudioPlayerContextProviderProps,
) {
  const api = useContext(ApiContext);
  const playerRef = useRef<AudioPlayer>();

  // TODO: Use queue
  const [queue, setQueue] = useState<TrackQueue>({ tracks: [] });
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>();
  const trackId = nowPlaying?.track.id;

  // Initialize our audio player (which conceptually operates in the 'imperative world')
  useEffect(() => {
    playerRef.current = new AudioPlayer();
  }, []);

  const value: AudioPlayerContextValue = {
    nowPlaying,
    get isPlaying() {
      return isPlaying;
    },
    set isPlaying(shouldPlay: boolean) {
      (async () => {
        if (playerRef.current) {
          await playerRef.current.setPlaying(shouldPlay);
          setPlaying(playerRef.current.isPlaying);
        }
      })();
    },
    play(track: AnnotatedTrack): void {
      setNowPlaying({ track, elapsedMs: 0 });
    },
  };

  const updateAudioBuffer = useCallback(async () => {
    // TODO: More advanced logic for picking the file, e.g. by quality/file type?
    const audioFiles = trackId ? await api.getTrackAudioFiles(trackId) : [];
    const audioFile = audioFiles.find(() => true);
    const newAudioBuffer = audioFile?.id
      ? await api.getFileData(audioFile.id)
      : undefined; // TODO: Do the AudioPlayer implementations handle an empty buffer correctly?
    playerRef.current?.setBuffer(newAudioBuffer);
  }, [api, trackId]);

  // Update the audio buffer whenever the current track changes
  useEffect(() => {
    updateAudioBuffer();
    setPlaying(false);
  }, [updateAudioBuffer, trackId]);

  return (
    <AudioPlayerContext.Provider value={value}>
      {props.children}
    </AudioPlayerContext.Provider>
  );
}
