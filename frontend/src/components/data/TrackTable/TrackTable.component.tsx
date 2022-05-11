import { DataTable } from '@bassment/components/data/DataTable';
import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import React, { memo, useState } from 'react';

export const TrackTable = memo(
  ({ tracks, filter, onPlay }: TrackTableProps) => {
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

    return (
      <DataTable
        headers={['ID', 'Album', 'Artist', 'Title', 'Genre']}
        initialWidths={[40, 200, 200, 400, 200]}
        data={tracks.map(track => ({
          _track: track, // Internal property for keeping the track
          key: track.id!,
          ID: track.id,
          Album: track.albums.map(a => a.name).join(', '),
          Artist: track.artists.map(a => a.name).join(', '),
          Title: track.title ?? '',
          Genre: track.genres.map(g => g.name).join(', '),
        }))}
        filter={filter}
        selectedRowKey={selectedId}
        onSelectRow={item => setSelectedId(item?.key)}
        onDoubleClickRow={item => {
          const track = item?._track;
          if (onPlay && track) {
            onPlay(track);
          }
        }}
      />
    );
  },
);
