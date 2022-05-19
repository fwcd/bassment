import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import React, { memo, useMemo, useState } from 'react';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  useTableInstance,
} from '@tanstack/react-table';
import { AnnotatedTrack } from '@bassment/models/Track';
import { useTrackTableStyles } from '@bassment/components/data/TrackTable/TrackTable.style.web';

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
        cell: ({ row: { original } }) =>
          original?.albums.map(a => a.name).join(', '),
        size: 30,
      }),
      table.createDataColumn('artists', {
        header: () => 'Artists',
        cell: ({ row: { original } }) =>
          original?.artists.map(a => a.name).join(', '),
        size: 30,
      }),
      table.createDataColumn('title', {
        header: () => 'Title',
      }),
    ],
    [],
  );

  const instance = useTableInstance(table, {
    data: tracks,
    columns,
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
                  style={{
                    width: header.getSize(),
                  }}>
                  {header.isPlaceholder ? null : header.renderHeader()}
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
              onClick={() => setSelectedIds(new Set([row.original!.id!]))}
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
