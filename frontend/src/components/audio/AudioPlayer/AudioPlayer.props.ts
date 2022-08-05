import { AnnotatedTrack } from '@bassment/models/Track';

export interface AudioPlayerProps {
  isPlayingRequested?: boolean;
  seekMs?: number;
  track?: AnnotatedTrack;
  url?: string;
  onUpdateElapsedMs?: (elapsedMs: number) => void;
  onUpdateTotalMs?: (totalMs: number) => void;
  onUpdatePlaying?: (isPlaying: boolean) => void;
  onEnded?: () => void;
}
