export interface AudioPlayerProps {
  isPlaying?: boolean;
  seekMs?: number;
  url?: string;
  onUpdateElapsedMs?: (elapsedMs: number) => void;
  onUpdateTotalMs?: (totalMs: number) => void;
  onUpdatePlaying?: (isPlaying: boolean) => void;
}
