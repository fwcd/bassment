import { PartialAlbum } from '@bassment/models/Album';
import { PartialArtist } from '@bassment/models/Artist';
import { KeyedTag } from '@bassment/models/Tag';

export interface Track {
  id: number;
  title: string;
  year: string | null;
  comment: string | null;
  durationMs: number | null;
  // TODO: More fields
}

export interface AnnotatedTrack extends Track {
  artists: PartialArtist[];
  albums: PartialAlbum[];
  tags: KeyedTag[];
}
