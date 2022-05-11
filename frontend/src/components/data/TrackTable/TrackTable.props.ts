import { AnnotatedTrack } from '@bassment/models/Track';

export interface TrackTableProps {
  tracks: AnnotatedTrack[];
  filter?: string;
  onPlay?: (track: AnnotatedTrack) => void;
}
