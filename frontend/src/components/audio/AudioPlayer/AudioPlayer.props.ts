export interface AudioPlayerProps {
  isPlayingRequested?: boolean;
  seekMs?: number;
  url?: string;
  onUpdateElapsedMs?: (elapsedMs: number) => void;
  onUpdateTotalMs?: (totalMs: number) => void;
  onUpdatePlaying?: (isPlaying: boolean) => void;
  onEnded?: () => void;
}
