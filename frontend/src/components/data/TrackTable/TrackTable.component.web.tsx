import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import { useTrackTableStyles } from '@bassment/components/data/TrackTable/TrackTable.style.web';
import { useStyles } from '@bassment/styles';
import React, { useCallback, useMemo, useState } from 'react';
import DataGrid, { SortColumn } from 'react-data-grid';

// TODO: Pass columnKey to compare function, e.g. to implement more
//       specialized comparisons, like the circle-of-fifths ordering
//       of keys?

function compare(x: any, y: any) {
  if (typeof x === 'string' && typeof y === 'string') {
    return x.localeCompare(y);
  } else if (typeof x === 'number' && typeof y === 'number') {
    return x - y;
  } else {
    return 0;
  }
}

export function TrackTable({ tracks, onPlay }: TrackTableProps) {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

  const columns = [
    { key: 'id', name: 'ID', width: '4%' },
    { key: 'album', name: 'Album', width: '15%' },
    { key: 'artist', name: 'Artist', width: '20%' },
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
    return [...rows].sort((x, y) => {
      for (const sort of sortColumns) {
        const compResult = compare(
          (x as any)[sort.columnKey],
          (y as any)[sort.columnKey],
        );
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
    <>
      <DataGrid
        style={styles.grid}
        rowHeight={1.5 * globalStyles.text.fontSize}
        columns={columns}
        rows={sortedRows}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        onRowDoubleClick={onRowDoubleClick}
      />
      {/* We patch the CSS at runtime since react-data-grid doesn't use react-native's styling. */}
      <style>{styles.patched}</style>
    </>
  );
}
