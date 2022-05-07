import { Playlist } from '@bassment/models/Playlist';
import { PlaylistKind } from '@bassment/models/PlaylistKind';
import { Track } from '@bassment/models/Track';

interface ApiTimestamp {
  // TODO: Type these
}

// Corresponds to the backend's crate::models::track::Track
export interface ApiTrack {
  id?: number;
  name?: string;
  year?: string | null;
  comment?: string | null;
  duration_ms?: number | null;
  sample_rate?: number | null;
  channels?: number | null;
  bpm?: number | null;
  times_played?: number;
  rating?: number | null;
  key?: string | null;
  color?: number | null;
  added_at?: ApiTimestamp;
  last_modified_at?: ApiTimestamp;
  last_played_at?: ApiTimestamp | null;
  added_by?: number | null;
  beats?: number | null;
  keys?: number | null;
}

// Corresponds to the backend's crate::models::playlist::Playlist
export interface ApiPlaylist {
  id?: number;
  name?: string;
  kind?: PlaylistKind;
  cover_art_id?: number | null;
  parent_id?: number | null;
  position?: number | null;
  last_modified_at?: ApiTimestamp | null;
  added_by?: number | null;
  description?: string | null;
}

// TODO: Other API structures

/** Converts an API track to a model track. */
export function fromApiTrack(track: ApiTrack): Track {
  return {
    id: track.id,
    name: track.name,
    year: track.year,
    comment: track.comment,
    durationMs: track.duration_ms,
  };
}

/** Converts a list of API playlists to (hierarchial) model playlists. */
export function fromApiPlaylists(
  playlists: ApiPlaylist[],
  parent?: ApiPlaylist,
): Playlist[] {
  return playlists
    .filter(({ parent_id }) => parent_id === parent?.id)
    .map(p => ({
      id: p.id,
      name: p.name,
      kind: p.kind,
      coverArtId: p.cover_art_id,
      position: p.position,
      addedBy: p.added_by,
      description: p.description,
      children: fromApiPlaylists(playlists, p),
    }));
}

// TODO: toApiXyz methods
