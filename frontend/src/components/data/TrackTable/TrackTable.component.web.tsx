import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import { useTrackTableStyles } from '@bassment/components/data/TrackTable/TrackTable.style.web';
import { useStyles } from '@bassment/styles';
import React, { useCallback, useMemo, useState } from 'react';
import DataGrid, { SortColumn } from 'react-data-grid';

export function TrackTable({ tracks, onPlay }: TrackTableProps) {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

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

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) {
      return rows;
    }

    return [...rows].sort((x, y) => {
      for (const sort of sortColumns) {
        const compResult = `${x}`.localeCompare(`${y}`);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

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

  const globalStyles = useStyles();
  const styles = useTrackTableStyles();

  return (
    <DataGrid
      style={styles.grid}
      rowHeight={1.5 * globalStyles.text.fontSize}
      columns={columns}
      rows={sortedRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      onRowDoubleClick={onRowDoubleClick}
    />
  );
}
