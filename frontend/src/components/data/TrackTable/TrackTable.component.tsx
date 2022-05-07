import { DataTable } from '@bassment/components/data/DataTable';
import { Track } from '@bassment/models/Track';
import React from 'react';

interface TrackTableProps {
  tracks: Track[];
}

export function TrackTable(props: TrackTableProps) {
  return (
    <DataTable
      headers={['Title', 'Artist']}
      data={props.tracks.map(t => ({
        Title: t.name ?? '',
        Artist: 'TODO', // TODO: Add artists, see also comments in Api.protocol.tsx
      }))}
    />
  );
}
