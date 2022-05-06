import { useDataTableStyles } from '@bassment/components/data/DataTable/DataTable.style';
import { DataTableRow } from '@bassment/components/data/DataTableRow';
import { useStyles } from '@bassment/styles';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface DataTableProps {
  headers: string[];
  initialWidths?: number[];
  data?: { [key: string]: string }[];
}

enum Order {
  Descending,
  Ascending,
}

export function DataTable(props: DataTableProps) {
  const globalStyles = useStyles();
  const styles = useDataTableStyles();
  // TODO: Assert that initialWidths.length == headers.length
  const [widths, setWidths] = useState(
    props.initialWidths ?? props.headers.map(_ => 200),
  );
  const [orders, setOrders] = useState<(Order | null)[]>(
    props.headers.map(_ => null),
  );

  return (
    // TODO: Horizontal scroll?
    <FlatList
      style={styles.table}
      data={props.data}
      ListHeaderComponent={
        <DataTableRow
          headers={props.headers}
          even
          icons={orders.map(o => {
            if (o !== null) {
              let name: string;
              switch (o) {
                case Order.Descending:
                  name = 'chevron-down-outline';
                  break;
                case Order.Ascending:
                  name = 'chevron-up-outline';
                  break;
              }
              return (
                <Icon
                  name={name}
                  size={globalStyles.icon.size}
                  color={globalStyles.icon.color}
                />
              );
            }
            return null;
          })}
          onPress={j => {
            const current = orders[j];
            let newOrders = [...orders];

            if (current === Order.Descending) {
              newOrders[j] = Order.Ascending;
            } else if (current === Order.Ascending) {
              newOrders[j] = null;
            } else {
              newOrders[j] = Order.Descending;
            }

            setOrders(newOrders);
          }}
          widths={widths}
          setWidths={setWidths}
        />
      }
      renderItem={({ item, index: i }) => (
        <DataTableRow
          headers={props.headers}
          even={i % 2 === 1}
          item={item}
          widths={widths}
          setWidths={setWidths}
        />
      )}
    />
  );
}
