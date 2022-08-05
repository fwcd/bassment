import { AnnotatedTrack } from '@bassment/models/Track';

export interface AudioPlayerProps {
  isPlayingRequested?: boolean;
  seekMs?: number;
  track?: AnnotatedTrack;
  url?: string;
  onRequestPlaying?: (playing: boolean) => void;
  onRequestForward?: () => void;
  onRequestBack?: () => void;
  onUpdateElapsedMs?: (elapsedMs: number) => void;
  onUpdateTotalMs?: (totalMs: number) => void;
  onUpdatePlaying?: (isPlaying: boolean) => void;
  onEnded?: () => void;
}
