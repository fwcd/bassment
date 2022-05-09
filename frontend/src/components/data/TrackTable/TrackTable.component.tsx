import { DataTable } from '@bassment/components/data/DataTable';
import { AnnotatedTrack } from '@bassment/models/Track';
import React, { useState } from 'react';

interface TrackTableProps {
  tracks: AnnotatedTrack[];
  filter?: string;
}

export function TrackTable(props: TrackTableProps) {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  return (
    <DataTable
      headers={['Album', 'Artist', 'Title']}
      data={props.tracks.map(track => ({
        key: track.id!,
        Album: track.albums.map(a => a.name).join(', '),
        Artist: track.artists.map(a => a.name).join(', '),
        Title: track.name ?? '',
      }))}
      filter={props.filter}
      selectedRowKey={selectedId}
      onSelectRow={item => setSelectedId(item?.key)}
    />
  );
}
