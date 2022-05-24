import { AnnotatedTrack } from '@bassment/models/Track';

export interface TrackTableProps {
  tracks: AnnotatedTrack[];
  onPlay?: (params: { track: AnnotatedTrack; base?: AnnotatedTrack[] }) => void;
}
