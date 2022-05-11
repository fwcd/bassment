import { useDataTableStyles } from '@bassment/components/data/DataTable/DataTable.style';
import { DataTableRow } from '@bassment/components/data/DataTableRow';
import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';

interface DataItem {
  key: number;
  [key: string]: any;
}

interface DataTableProps<T> {
  headers: string[];
  data?: T[];
  initialWidths?: number[];
  filter?: string;
  selectedRowKey?: number;
  onSelectRow?: (item?: T) => void;
  onDoubleClickRow?: (item?: T) => void;
}

enum Order {
  Ascending,
  Descending,
}

interface OrderedColumn {
  index: number;
  order: Order;
}

export function DataTable<T extends DataItem>({
  headers,
  data,
  initialWidths,
  filter,
  selectedRowKey,
  onSelectRow,
  onDoubleClickRow,
}: DataTableProps<T>) {
  const styles = useDataTableStyles();

  // TODO: Assert that initialWidths.length == headers.length
  const [widths, setWidths] = useState(initialWidths ?? headers.map(_ => 200));
  const [orderedColumn, setOrderedColumn] = useState<OrderedColumn | null>(
    null,
  );

  // Sort data if needed
  let sortedData = [...(data ?? [])];
  if (orderedColumn) {
    const header = headers[orderedColumn.index];
    sortedData.sort(
      orderedColumn.order === Order.Ascending
        ? (x, y) => `${x[header]}`.localeCompare(`${y[header]}`)
        : (x, y) => `${y[header]}`.localeCompare(`${x[header]}`),
    );
  }

  const filteredData =
    (filter?.length ?? 0) > 0
      ? sortedData.filter(item =>
          Object.values(item).some(
            v =>
              typeof v === 'string' &&
              v.toLowerCase().includes(filter!.toLowerCase().trim()),
          ),
        )
      : sortedData;

  const onClickCell = useCallback(
    (j: number) => {
      if (orderedColumn && orderedColumn.index === j) {
        const order = orderedColumn.order;
        if (order === Order.Ascending) {
          setOrderedColumn({
            ...orderedColumn,
            order: Order.Descending,
          });
        } else if (order === Order.Descending) {
          setOrderedColumn(null);
        }
      } else {
        setOrderedColumn({ index: j, order: Order.Ascending });
      }
    },
    [orderedColumn],
  );

  const renderItem = useCallback(
    ({ item, index: i }) => (
      <DataTableRow
        key={item.key ?? i}
        headers={headers}
        even={i % 2 === 1}
        selected={selectedRowKey === item.key}
        hoverable
        item={item}
        widths={widths}
        setWidths={setWidths}
        onClick={() => {
          if (onSelectRow) {
            onSelectRow(item);
          }
        }}
        onDoubleClick={() => {
          if (onDoubleClickRow) {
            onDoubleClickRow(item);
          }
        }}
      />
    ),
    [headers, widths, selectedRowKey, onSelectRow, onDoubleClickRow],
  );

  return (
    // TODO: Horizontal scroll?
    <FlatList
      style={styles.table}
      data={filteredData}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <DataTableRow
          key={'_headers'}
          headers={headers}
          even
          icons={
            orderedColumn
              ? Array.from({ length: headers.length }, (_, i) => {
                  if (i === orderedColumn.index) {
                    let name: string;
                    switch (orderedColumn.order) {
                      case Order.Descending:
                        name = 'chevron-down-outline';
                        break;
                      case Order.Ascending:
                        name = 'chevron-up-outline';
                        break;
                    }
                    return <ThemedIcon name={name} />;
                  }
                  return null;
                })
              : undefined
          }
          onClickCell={onClickCell}
          widths={widths}
          setWidths={setWidths}
        />
      }
      renderItem={renderItem}
    />
  );
}
