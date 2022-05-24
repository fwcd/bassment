import { AnnotatedTrack } from '@bassment/models/Track';

export interface TrackQueue {
  /** The queued tracks to be played next. */
  tracks: AnnotatedTrack[];
  /** The tracks from the underlying base playlist. */
  base: AnnotatedTrack[];
  /** The previously played tracks. */
  history: AnnotatedTrack[];
}
