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
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const columns = useMemo(
    () => [
      table.createDataColumn('artists', {
        header: () => <div style={{ width: '50%' }}>Artists</div>,
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
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead style={styles.head}>
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
                <td key={cell.id} style={styles.cell}>
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
