import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import { useTrackTableStyles } from '@bassment/components/data/TrackTable/TrackTable.style.web';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { KeyedTag } from '@bassment/models/Tag';
import { AnnotatedTrack } from '@bassment/models/Track';
import { useStyles } from '@bassment/styles';
import { fromDrops } from '@bassment/utils/dropConversions.web';
import React, { useCallback, useMemo, useState } from 'react';
import DataGrid, {
  Column,
  Row,
  RowRendererProps,
  SortColumn,
} from 'react-data-grid';

function joinNames(xs: { name?: string }[]): string {
  return xs.map(x => x.name ?? '').join(', ');
}

function joinTags(tags: KeyedTag[]): string {
  return tags.map(tag => `${tag.displayName}: ${tag.value}`).join(', ');
}

function compare(
  x: AnnotatedTrack,
  y: AnnotatedTrack,
  columnKey: keyof AnnotatedTrack,
) {
  switch (columnKey) {
    case 'id':
      return (x[columnKey] ?? 0) - (y[columnKey] ?? 0);
    case 'title':
      return (x[columnKey] ?? '').localeCompare(y[columnKey] ?? '');
    case 'artists':
    case 'albums':
      return joinNames(x[columnKey]).localeCompare(joinNames(y[columnKey]));
    case 'tags':
      return joinTags(x[columnKey]).localeCompare(joinTags(y[columnKey]));
    default:
      return 0;
  }
}

export function TrackTable({ tracks, onPlay }: TrackTableProps) {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  const columns: Column<AnnotatedTrack>[] = useMemo(
    () => [
      { key: 'id', name: 'ID', width: '4%' },
      {
        key: 'albums',
        name: 'Album',
        width: '15%',
        formatter: ({ row }) => (
          <ThemedText>{joinNames(row.albums)}</ThemedText>
        ),
      },
      {
        key: 'artists',
        name: 'Artist',
        width: '20%',
        formatter: ({ row }) => (
          <ThemedText>{joinNames(row.artists)}</ThemedText>
        ),
      },
      { key: 'title', name: 'Title' },
      {
        key: 'tags',
        name: 'Tags',
        formatter: ({ row }) => <ThemedText>{joinTags(row.tags)}</ThemedText>,
      },
    ],
    [],
  );

  const rows: AnnotatedTrack[] = tracks;
  const sortedRows = useMemo(() => {
    return [...rows].sort((x, y) => {
      for (const sort of sortColumns) {
        const compResult = compare(
          x,
          y,
          sort.columnKey as keyof AnnotatedTrack,
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

  const onRowDoubleClick = useCallback(
    (track: AnnotatedTrack) => {
      if (onPlay) {
        onPlay(track);
      }
    },
    [onPlay],
  );

  const [lastClick, setLastClick] = useState<{
    time: number;
    trackId?: number;
  }>({
    time: 0,
  });

  const rowRenderer = useCallback(
    (props: RowRendererProps<AnnotatedTrack>) => (
      <Row
        {...props}
        draggable
        onDragStart={e => {
          const transfer = e.dataTransfer;

          const img = document.createElement('img');
          // TODO: Use a proper image
          img.src = 'http://kryogenix.org/images/hackergotchi-simpler.png';
          transfer.setDragImage(img, 0, 0);

          fromDrops(
            [
              {
                kind: 'tracks',
                tracks: tracks.filter(t =>
                  t.id ? selectedRows.has(t.id) : false,
                ),
              },
            ],
            transfer,
          );
        }}
        onMouseDown={() => {
          // We manually detect double-clicks since changing
          // state during the onMouseDown will prevent the
          // onDoubleClick from firing

          const now = Date.now();
          const trackId = props.row.id;

          if (
            (!lastClick.trackId || trackId === lastClick.trackId) &&
            now - lastClick.time < 500 /* ms */
          ) {
            onRowDoubleClick(props.row);
          }

          setSelectedRows(new Set(trackId ? [trackId] : []));
          setLastClick({ time: now, trackId });
        }}
      />
    ),
    [selectedRows, lastClick, tracks, onRowDoubleClick],
  );

  const getRowKey = useCallback((track: AnnotatedTrack) => track.id!, []);

  return (
    <>
      <DataGrid
        rowKeyGetter={getRowKey}
        style={styles.grid}
        rowHeight={1.5 * globalStyles.text.fontSize}
        columns={columns}
        rows={sortedRows}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        selectedRows={selectedRows}
        sortColumns={sortColumns}
        onSelectedRowsChange={setSelectedRows}
        onSortColumnsChange={setSortColumns}
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
