export interface AudioPlayerProps {
  isPlaying?: boolean;
  url?: string;
  onUpdateElapsedMs?: (elapsedMs: number) => void;
  onUpdateTotalMs?: (totalMs: number) => void;
  onUpdatePlaying?: (isPlaying: boolean) => void;
}
