import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import React from 'react';
import DataGrid from 'react-data-grid';

export function TrackTable({ tracks, filter, onPlay }: TrackTableProps) {
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

  return <DataGrid columns={columns} rows={rows} />;
}
