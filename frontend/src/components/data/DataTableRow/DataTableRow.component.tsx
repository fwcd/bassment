import { useDataTableRowStyles } from '@bassment/components/data/DataTableRow/DataTableRow.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import React from 'react';
import { View } from 'react-native';

interface DataTableRowProps {
  even: boolean;
  headers: string[];
  widths: number[];
  item: { [key: string]: string };
}

export function DataTableRow(props: DataTableRowProps) {
  const styles = useDataTableRowStyles();
  return (
    <View style={[styles.row, props.even ? styles.even : styles.odd]}>
      {props.headers.map((h, j) => (
        <View style={[styles.cell, { width: props.widths[j] }]}>
          <ThemedText>{props.item[h]}</ThemedText>
        </View>
      ))}
    </View>
  );
}
