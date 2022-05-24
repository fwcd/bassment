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
  /** The next tracks to play. */
  readonly queue?: TrackQueue;
  /** Whether playback is active. */
  readonly isPlaying: boolean;

  /** Sets playback state. */
  setPlaying(playing: boolean): void;

  /** Plays the given track immediately. */
  play(track: AnnotatedTrack): void;

  /** Plays the previous track. */
  back(): void;

  /** Skips to the next track. */
  forward(): void;

  /** Appends the given tracks to the queue. */
  enqueue(tracks: AnnotatedTrack[]): void;

  /** Updates the queue's base tracks. */
  rebase(base: AnnotatedTrack[]): void;

  /** Seeks to the given offset in the current track. */
  seek(elapsedMs: number): void;
}

export const AudioPlayerContext = createContext<AudioPlayerContextValue>({
  isPlaying: false,
  setPlaying: () => {},
  play: () => {},
  back: () => {},
  forward: () => {},
  enqueue: () => {},
  rebase: () => {},
  seek: () => {},
});

interface AudioPlayerContextProviderProps {
  children: ReactNode;
}

export function AudioPlayerContextProvider(
  props: AudioPlayerContextProviderProps,
) {
  const api = useContext(ApiContext);

  // Actual player state
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [totalMs, setTotalMs] = useState<number>(0);

  // Requested state
  const [track, setTrack] = useState<AnnotatedTrack>();
  const [isPlayingRequested, setPlayingRequested] = useState<boolean>();
  const [queue, setQueue] = useState<TrackQueue>({
    tracks: [],
    base: [],
    history: [],
  });
  const [seekMs, setSeekMs] = useState<number>();
  const [audioUrl, setAudioUrl] = useState<string>();

  const play = useCallback((newTrack: AnnotatedTrack) => {
    setTrack(newTrack);
    setSeekMs(0);
    setPlayingRequested(true);
  }, []);

  const enqueue = useCallback(
    (newTracks: AnnotatedTrack[]) => {
      const nextTracks = [...queue.tracks, ...newTracks];
      if (isPlaying) {
        setQueue({ ...queue, tracks: nextTracks });
      } else if (nextTracks.length > 0) {
        const nextTrack = nextTracks[0];
        setQueue({
          ...queue,
          tracks: nextTracks.slice(1),
          history: [...queue.history, nextTrack],
        });
        play(nextTrack);
      }
    },
    [queue, isPlaying, play],
  );

  const rebase = useCallback(
    (newBase: AnnotatedTrack[]) => {
      setQueue({ ...queue, base: newBase });
    },
    [queue],
  );

  const updatePlaying = useCallback((newPlaying: boolean) => {
    setPlaying(newPlaying);
    setPlayingRequested(undefined);
  }, []);

  const updateElapsedMs = useCallback((newElapsedMs: number) => {
    setElapsedMs(newElapsedMs);
    setSeekMs(undefined);
  }, []);

  const advanceQueue = useCallback(() => {
    if (queue.tracks.length > 0) {
      // Dequeue from the next tracks
      const next = queue.tracks[0];
      setQueue({
        ...queue,
        tracks: queue.tracks.slice(1),
        history: [...queue.history, next],
      });
      setTrack(next);
    } else if (queue.base.length > 0) {
      // Dequeue from the base tracks
      const next = queue.base[0];
      setQueue({
        ...queue,
        base: queue.base.slice(1),
        history: [...queue.history, next],
      });
      setTrack(next);
    } else {
      // Queue ended, stop playback
      setPlayingRequested(false);
    }
    setSeekMs(0);
  }, [queue]);

  const updateAudioUrl = useCallback(async () => {
    // TODO: More advanced logic for picking the file, e.g. by quality/file type?
    const audioFiles = track?.id ? await api.getTrackAudioFiles(track.id) : [];
    const audioFile = audioFiles.find(() => true);
    const newAudioUrl = audioFile?.id
      ? api.getFileDataUrl(audioFile.id)
      : undefined;
    const canPlay = newAudioUrl !== undefined;

    if (canPlay) {
      setAudioUrl(newAudioUrl);
      setPlayingRequested(true);
    } else {
      // TODO: This seems to 'skip' over tracks, investigate why
      // advanceQueue();
    }
  }, [api, track]);

  // Update the audio buffer whenever the current track changes
  useEffect(() => {
    updateAudioUrl();
  }, [updateAudioUrl]);

  const back = useCallback(() => {
    // TODO: Implement back
  }, []);

  const forward = useCallback(() => {
    advanceQueue();
  }, [advanceQueue]);

  const value: AudioPlayerContextValue = {
    nowPlaying: track ? { track, elapsedMs, totalMs } : undefined,
    queue,
    isPlaying,
    setPlaying: setPlayingRequested,
    play,
    back,
    forward,
    enqueue,
    rebase,
    seek: setSeekMs,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      <AudioPlayer
        isPlayingRequested={isPlayingRequested}
        url={audioUrl}
        seekMs={seekMs}
        onUpdatePlaying={updatePlaying}
        onUpdateElapsedMs={updateElapsedMs}
        onUpdateTotalMs={setTotalMs}
        onEnded={advanceQueue}
      />
      {props.children}
    </AudioPlayerContext.Provider>
  );
}
