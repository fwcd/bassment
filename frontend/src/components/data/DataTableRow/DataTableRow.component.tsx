import { DataTableCell } from '@bassment/components/data/DataTableCell';
import { useDataTableRowStyles } from '@bassment/components/data/DataTableRow/DataTableRow.style';
import React from 'react';
import { View } from 'react-native';

interface DataTableRowProps {
  headers: string[];
  item?: { [key: string]: string };
  even: boolean;
  onPress?: (index: number) => void;
  widths: number[];
  setWidths?: (widths: number[]) => void;
}

export function DataTableRow(props: DataTableRowProps) {
  const styles = useDataTableRowStyles();

  return (
    <View style={[styles.row, props.even ? styles.evenRow : styles.oddRow]}>
      {props.headers.map((h, j) => (
        <DataTableCell
          header={h}
          index={j}
          item={props.item}
          rowEven={props.even}
          onPress={() => {
            if (props.onPress) {
              props.onPress(j);
            }
          }}
          widths={props.widths}
          setWidths={props.setWidths}
        />
      ))}
    </View>
  );
}
