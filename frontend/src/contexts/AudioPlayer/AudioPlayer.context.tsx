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

  // Updaters

  const updatePlaying = useCallback((newPlaying: boolean) => {
    setPlaying(newPlaying);
    setPlayingRequested(undefined);
  }, []);

  const updateElapsedMs = useCallback((newElapsedMs: number) => {
    setElapsedMs(newElapsedMs);
    setSeekMs(undefined);
  }, []);

  // Queue mutators

  const rebase = useCallback((newBase: AnnotatedTrack[]) => {
    setQueue(q => ({ ...q, base: newBase }));
  }, []);

  const popFrontTrack = useCallback(() => {
    setQueue(q => ({ ...q, tracks: q.tracks.slice(1) }));
  }, []);

  const pushFrontTrack = useCallback((pushedTrack: AnnotatedTrack) => {
    setQueue(q => ({ ...q, tracks: [pushedTrack, ...q.tracks] }));
  }, []);

  const popFrontBase = useCallback(() => {
    setQueue(q => ({ ...q, base: q.base.slice(1) }));
  }, []);

  const pushHistory = useCallback((pushedTrack: AnnotatedTrack) => {
    setQueue(q => ({ ...q, history: [...q.history, pushedTrack] }));
  }, []);

  const popHistory = useCallback(() => {
    setQueue(q => ({
      ...q,
      history: q.history.slice(0, q.history.length - 1),
    }));
  }, []);

  const pushTracks = useCallback((pushedTracks: AnnotatedTrack[]) => {
    setQueue(q => ({ ...q, tracks: [...q.tracks, ...pushedTracks] }));
  }, []);

  const advanceQueue = useCallback(() => {
    if (track) {
      // Push previous track to history
      pushHistory(track);
    }

    if (queue.tracks.length > 0) {
      // Dequeue from the next tracks
      const next = queue.tracks[0];
      popFrontTrack();
      setTrack(next);
    } else if (queue.base.length > 0) {
      // Dequeue from the base tracks
      const next = queue.base[0];
      popFrontBase();
      setTrack(next);
    } else {
      // Queue ended, stop playback
      setPlayingRequested(false);
    }
    setSeekMs(0);
  }, [
    pushHistory,
    popFrontBase,
    popFrontTrack,
    queue.base,
    queue.tracks,
    track,
  ]);

  const updateAudioUrl = useCallback(async () => {
    // TODO: More advanced logic for picking the file, e.g. by quality/file type?
    const audioFiles = track ? await api.getTrackAudioFiles(track.id) : [];
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

  // Play controls

  const play = useCallback((newTrack: AnnotatedTrack) => {
    setTrack(newTrack);
    setSeekMs(0);
    setPlayingRequested(true);
  }, []);

  const back = useCallback(() => {
    if (elapsedMs < 2000 && queue.history.length > 0) {
      if (track) {
        pushFrontTrack(track);
      }
      const newTrack = queue.history[queue.history.length - 1];
      popHistory();
      play(newTrack);
    } else {
      setSeekMs(0);
    }
  }, [elapsedMs, track, queue.history, play, popHistory, pushFrontTrack]);

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
    enqueue: pushTracks,
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
