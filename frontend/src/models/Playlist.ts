import { PlaylistKind } from '@bassment/models/PlaylistKind';

export interface Playlist {
  id?: number;
  name?: string;
  kind?: PlaylistKind;
  coverArtId?: number | null;
  position?: number | null;
  addedBy?: number | null;
  description?: string | null;
  // TODO: More fields
}

export interface PlaylistTreeNode extends Playlist {
  children: PlaylistTreeNode[];
}
