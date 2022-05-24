import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import { useTrackTableStyles } from '@bassment/components/data/TrackTable/TrackTable.style.web';
import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { AnnotatedTrack } from '@bassment/models/Track';
import { fromDrops } from '@bassment/utils/dropConversions.web';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useTableInstance,
} from '@tanstack/react-table';
import React, { memo, useMemo, useState } from 'react';

function joinNames(xs: { name?: string }[]): string {
  return xs
    .map(x => x.name)
    .filter(x => x)
    .join(', ');
}

function joinedNameSortingFn<T>(
  extractor: (item?: T) => { name?: string }[],
): (first: { original?: T }, second: { original?: T }) => number {
  return ({ original: x }, { original: y }) =>
    joinNames(extractor(x)).localeCompare(joinNames(extractor(y)));
}

const table = createTable().setRowType<AnnotatedTrack>();

export const TrackTable = memo(({ tracks, onPlay }: TrackTableProps) => {
  const styles = useTrackTableStyles();
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  const columns = useMemo(
    () => [
      table.createDataColumn('albums', {
        header: () => 'Albums',
        cell: ({ row: { original } }) => joinNames(original?.albums ?? []),
        sortingFn: joinedNameSortingFn(original => original?.albums ?? []),
        sortDescFirst: false,
        size: 30,
      }),
      table.createDataColumn('artists', {
        header: () => 'Artists',
        cell: ({ row: { original } }) => joinNames(original?.artists ?? []),
        sortingFn: joinedNameSortingFn(original => original?.artists ?? []),
        sortDescFirst: false,
        size: 30,
      }),
      table.createDataColumn('title', {
        header: () => 'Title',
        sortDescFirst: false,
      }),
    ],
    [],
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  const instance = useTableInstance(table, {
    data: tracks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="tt-wrapper">
      <table className="tt-table">
        <thead className="tt-head">
          {instance.getHeaderGroups().map(group => (
            <tr key={group.id}>
              {group.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="tt-cell tt-head-cell"
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    width: header.getSize(),
                  }}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                  {header.column.getIsSorted() ? (
                    <ThemedIcon
                      name={
                        header.column.getIsSorted() === 'asc'
                          ? 'chevron-up-outline'
                          : 'chevron-down-outline'
                      }
                      size={12}
                    />
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className={[
                'tt-row',
                ...(selectedIds.has(row.original!.id!)
                  ? ['tt-selected']
                  : ['tt-unselected']),
              ].join(' ')}
              draggable
              onClick={e => {
                const id = row.original!.id!;
                if (e.shiftKey) {
                  // TODO: Select the range instead of just adding the id
                  setSelectedIds(new Set([...selectedIds, id]));
                } else {
                  setSelectedIds(new Set([id]));
                }
              }}
              onDragStart={e => {
                // TODO: Support dragging multiple elements, e.g. by dragging all selected ids instead?
                fromDrops(
                  [
                    {
                      kind: 'tracks',
                      tracks: row.original ? [row.original] : [],
                    },
                  ],
                  e.dataTransfer,
                );
              }}
              onDoubleClick={() => {
                if (onPlay) {
                  onPlay(row.original!);
                }
              }}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="tt-cell">
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style>{styles}</style>
    </div>
  );
});
