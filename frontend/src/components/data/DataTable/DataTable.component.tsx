import { useDataTableStyles } from '@bassment/components/data/DataTable/DataTable.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

interface DataTableProps {
  headers: string[];
  initialWidths?: number[];
  data?: { [key: string]: string }[];
}

export function DataTable(props: DataTableProps) {
  const styles = useDataTableStyles();
  // TODO: Assert that initialWidths.length == headers.length
  const [widths, setWidths] = useState(
    props.initialWidths ?? props.headers.map(_ => 200),
  );

  return (
    <FlatList
      style={styles.table}
      data={props.data}
      renderItem={({ item, index: i }) => (
        <View style={[styles.row, i % 2 === 0 ? styles.even : styles.odd]}>
          {props.headers.map((h, j) => (
            <View style={[styles.cell, { width: widths[j] }]}>
              <ThemedText>{item[h]}</ThemedText>
            </View>
          ))}
        </View>
      )}
    />
  );
}
