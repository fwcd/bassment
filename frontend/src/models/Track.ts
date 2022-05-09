import { PartialAlbum } from '@bassment/models/Album';
import { PartialArtist } from '@bassment/models/Artist';
import { PartialGenre } from '@bassment/models/Genre';

export interface Track {
  id?: number;
  name?: string;
  year?: string | null;
  comment?: string | null;
  durationMs?: number | null;
  // TODO: More fields
}

export interface AnnotatedTrack extends Track {
  artists: PartialArtist[];
  albums: PartialAlbum[];
  genres: PartialGenre[];
}
