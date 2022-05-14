import { AnnotatedTrack } from '@bassment/models/Track';

export interface TrackTableProps {
  tracks: AnnotatedTrack[];
  onPlay?: (track: AnnotatedTrack) => void;
}
