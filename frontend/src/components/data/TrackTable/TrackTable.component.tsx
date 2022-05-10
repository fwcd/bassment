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
      headers={['Album', 'Artist', 'Title']}
      data={props.tracks.map(track => ({
        _track: track, // Internal property for keeping the track
        key: track.id!,
        Album: track.albums.map(a => a.name).join(', '),
        Artist: track.artists.map(a => a.name).join(', '),
        Title: track.title ?? '',
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
