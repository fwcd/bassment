import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import { useTrackTableStyles } from '@bassment/components/data/TrackTable/TrackTable.style.web';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { AnnotatedTrack } from '@bassment/models/Track';
import { useStyles } from '@bassment/styles';
import React, { useCallback, useMemo, useState } from 'react';
import DataGrid, {
  Column,
  Row,
  RowRendererProps,
  SortColumn,
} from 'react-data-grid';

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

  const columns: Column<AnnotatedTrack>[] = [
    { key: 'id', name: 'ID', width: '4%' },
    {
      key: 'album',
      name: 'Album',
      width: '15%',
      formatter: ({ row }) => (
        <ThemedText>{row.albums.map(a => a.name).join(', ')}</ThemedText>
      ),
    },
    {
      key: 'artist',
      name: 'Artist',
      width: '20%',
      formatter: ({ row }) => (
        <ThemedText>{row.artists.map(a => a.name).join(', ')}</ThemedText>
      ),
    },
    { key: 'title', name: 'Title' },
    {
      key: 'genre',
      name: 'Genre',
      formatter: ({ row }) => (
        <ThemedText>{row.genres.map(g => g.name).join(', ')}</ThemedText>
      ),
    },
  ];

  const rows: AnnotatedTrack[] = tracks;
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

  const globalStyles = useStyles();
  const styles = useTrackTableStyles();

  // TODO: Multi-selection
  const [selectedId, setSelectedId] = useState<number>();

  const rowRenderer = useCallback(
    (props: RowRendererProps<AnnotatedTrack>) => <Row {...props} />,
    [],
  );

  const onRowClick = useCallback((track: AnnotatedTrack) => {
    setSelectedId(track.id);
  }, []);

  const onRowDoubleClick = useCallback(
    (track: AnnotatedTrack) => {
      if (onPlay) {
        onPlay(track);
      }
    },
    [onPlay],
  );

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
        // TODO: This doesn't seem to work, why?
        selectedRows={new Set(selectedId ? [selectedId] : [])}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
        components={{
          rowRenderer,
        }}
      />
      {/* We patch the CSS at runtime since react-data-grid doesn't use react-native's styling. */}
      <style>{styles.patched}</style>
    </>
  );
}
