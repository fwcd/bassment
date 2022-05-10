import { DataTable } from '@bassment/components/data/DataTable';
import { AnnotatedTrack } from '@bassment/models/Track';
import React, { useState } from 'react';

interface TrackTableProps {
  tracks: AnnotatedTrack[];
  filter?: string;
  onPlay?: (track: AnnotatedTrack) => void;
}

export function TrackTable(props: TrackTableProps) {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  return (
    <DataTable
      headers={['ID', 'Album', 'Artist', 'Title', 'Genre']}
      initialWidths={[40, 200, 200, 400, 200]}
      data={props.tracks.map(track => ({
        _track: track, // Internal property for keeping the track
        key: track.id!,
        ID: track.id,
        Album: track.albums.map(a => a.name).join(', '),
        Artist: track.artists.map(a => a.name).join(', '),
        Title: track.title ?? '',
        Genre: track.genres.map(g => g.name).join(', '),
      }))}
      filter={props.filter}
      selectedRowKey={selectedId}
      onSelectRow={item => setSelectedId(item?.key)}
      onDoubleClickRow={item => {
        const track = item?._track;
        if (props.onPlay && track) {
          props.onPlay(track);
        }
      }}
    />
  );
}
