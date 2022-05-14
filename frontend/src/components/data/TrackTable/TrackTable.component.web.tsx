import { TrackTableProps } from '@bassment/components/data/TrackTable/TrackTable.props';
import React, { memo, useMemo, useState } from 'react';
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  useTableInstance,
} from '@tanstack/react-table';
import { AnnotatedTrack } from '@bassment/models/Track';

const table = createTable().setRowType<AnnotatedTrack>();

export const TrackTable = memo(({ tracks, onPlay }: TrackTableProps) => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const columns = useMemo(
    () => [
      table.createDataColumn('artists', {
        header: () => 'Artists',
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
    <table>
      <thead>
        {instance.getHeaderGroups().map(group => (
          <tr key={group.id}>
            {group.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : header.renderHeader()}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {instance.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{cell.renderCell()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
