import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import React, { useCallback } from 'react';
import DataGrid from 'react-data-grid';

export function TrackTable({ tracks, onPlay }: TrackTableProps) {
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'album', name: 'Album' },
    { key: 'artist', name: 'Artist' },
    { key: 'title', name: 'Title' },
    { key: 'genre', name: 'Genre' },
  ];

  const rows = tracks.map(track => ({
    id: track.id,
    album: track.albums.map(a => a.name).join(', '),
    artist: track.artists.map(a => a.name).join(', '),
    title: track.title,
    genre: track.genres.map(g => g.name).join(', '),
  }));

  const onRowDoubleClick = useCallback(
    ({ id }: { id?: number }) => {
      // TODO: Something that isn't linear time
      const track = tracks.find(t => t.id === id);
      if (track && onPlay) {
        onPlay(track);
      }
    },
    [tracks, onPlay],
  );

  return (
    <DataGrid
      style={{ height: '100%' }}
      columns={columns}
      rows={rows}
      onRowDoubleClick={onRowDoubleClick}
    />
  );
}
