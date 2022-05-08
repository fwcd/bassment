import { DataTable } from '@bassment/components/data/DataTable';
import { AnnotatedTrack } from '@bassment/models/Track';
import React from 'react';

interface TrackTableProps {
  tracks: AnnotatedTrack[];
}

export function TrackTable(props: TrackTableProps) {
  return (
    <DataTable
      headers={['Album', 'Artist', 'Title']}
      data={props.tracks.map(track => ({
        key: track.id,
        Album: track.albums.map(a => a.name).join(', '),
        Artist: track.artists.map(a => a.name).join(', '),
        Title: track.name,
      }))}
    />
  );
}
