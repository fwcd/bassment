import { useDataTableStyles } from '@bassment/components/data/DataTable/DataTable.style';
import { DataTableRow } from '@bassment/components/data/DataTableRow';
import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

interface DataTableProps {
  headers: string[];
  initialWidths?: number[];
  searchText?: string;
  data?: any;
}

enum Order {
  Ascending,
  Descending,
}

interface OrderedColumn {
  index: number;
  order: Order;
}

export function DataTable(props: DataTableProps) {
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

  const searchText = props.searchText ?? '';
  const filteredData =
    searchText.length > 0
      ? data.filter(item =>
          Object.values(item).some(
            v => typeof v === 'string' && v.includes(searchText),
          ),
        )
      : data;

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
          onPress={j => {
            if (orderedColumn && orderedColumn.index === j) {
              const order = orderedColumn.order;
              if (order === Order.Ascending) {
                setOrderedColumn({ ...orderedColumn, order: Order.Descending });
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
          item={item}
          widths={widths}
          setWidths={setWidths}
        />
      )}
    />
  );
}
