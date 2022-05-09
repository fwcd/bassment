import { useDataTableStyles } from '@bassment/components/data/DataTable/DataTable.style';
import { DataTableRow } from '@bassment/components/data/DataTableRow';
import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';

interface DataItem {
  key: number;
  [key: string]: any;
}

interface DataTableProps<T> {
  headers: string[];
  initialWidths?: number[];
  filter?: string;
  selectedRowKey?: number;
  onSelectRow?: (item?: T) => void;
  data?: T[];
}

enum Order {
  Ascending,
  Descending,
}

interface OrderedColumn {
  index: number;
  order: Order;
}

export function DataTable<T extends DataItem>(props: DataTableProps<T>) {
  const styles = useDataTableStyles();
  const headers = props.headers;

  // TODO: Assert that initialWidths.length == headers.length
  const [widths, setWidths] = useState(
    props.initialWidths ?? headers.map(_ => 200),
  );
  const [orderedColumn, setOrderedColumn] = useState<OrderedColumn | null>(
    null,
  );

  // Sort data if needed
  let data = [...(props.data ?? [])];
  if (orderedColumn) {
    const header = headers[orderedColumn.index];
    data.sort(
      orderedColumn.order === Order.Ascending
        ? (x, y) => x[header].localeCompare(y[header])
        : (x, y) => y[header].localeCompare(x[header]),
    );
  }

  const filter = props.filter ?? '';
  const filteredData =
    filter.length > 0
      ? data.filter(item =>
          Object.values(item).some(
            v =>
              typeof v === 'string' &&
              v.toLowerCase().includes(filter.toLowerCase().trim()),
          ),
        )
      : data;

  return (
    // TODO: Horizontal scroll?
    <Pressable
      style={styles.pressable}
      onPressIn={() => {
        if (props.onSelectRow) {
          props.onSelectRow(undefined);
        }
      }}>
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
            onPressCell={j => {
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
            }}
            widths={widths}
            setWidths={setWidths}
          />
        }
        renderItem={({ item, index: i }) => (
          <DataTableRow
            key={item.key ?? i}
            headers={headers}
            even={i % 2 === 1}
            selected={props.selectedRowKey === item.key}
            hoverable
            item={item}
            widths={widths}
            setWidths={setWidths}
            onPress={() => {
              if (props.onSelectRow) {
                props.onSelectRow(item);
              }
            }}
          />
        )}
      />
    </Pressable>
  );
}
