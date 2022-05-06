import { useDataTableRowStyles } from '@bassment/components/data/DataTableRow/DataTableRow.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import React from 'react';
import { View } from 'react-native';

interface DataTableRowProps {
  even: boolean;
  headers: string[];
  widths: number[];
  item?: { [key: string]: string };
}

export function DataTableRow(props: DataTableRowProps) {
  const styles = useDataTableRowStyles();
  const item = props.item;
  return (
    <View style={[styles.row, props.even ? styles.evenRow : styles.oddRow]}>
      {props.headers.map((h, j) => (
        <View
          style={[
            styles.cell,
            ...(!props.even && j % 2 === 0 ? [styles.evenCell] : []),
            { width: props.widths[j] },
          ]}>
          <ThemedText style={item ? [] : [{ fontWeight: 'bold' }]}>
            {item ? item[h] : h}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}
