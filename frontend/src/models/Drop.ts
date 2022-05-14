import { AnnotatedTrack } from '@bassment/models/Track';

/** A value transferred via drag-n-drop. */
interface BaseDrop {
  kind: string;
}

export interface FileDrop extends BaseDrop {
  kind: 'file';
  file?: File;
}

export interface TracksDrop extends BaseDrop {
  kind: 'tracks';
  tracks: AnnotatedTrack[];
}

export interface StringDrop extends BaseDrop {
  kind: 'string';
  value: string;
  type: string;
}

export type Drop = FileDrop | TracksDrop | StringDrop;
