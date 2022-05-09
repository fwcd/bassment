import { AnnotatedTrack } from '@bassment/models/Track';

export interface NowPlaying {
  track: AnnotatedTrack;
  elapsedMs: number;
}
