import { DataTableCell } from '@bassment/components/data/DataTableCell';
import { useDataTableRowStyles } from '@bassment/components/data/DataTableRow/DataTableRow.style';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface DataTableRowProps {
  headers: string[];
  icons?: ReactNode[];
  item?: { [key: string]: string };
  even?: boolean;
  selected?: boolean;
  onPress?: (index: number) => void;
  widths: number[];
  setWidths?: (widths: number[]) => void;
}

export function DataTableRow(props: DataTableRowProps) {
  const styles = useDataTableRowStyles();
  const onPress = props.onPress;

  return (
    <View
      style={[
        styles.row,
        props.item
          ? props.even
            ? styles.evenRow
            : styles.oddRow
          : styles.headerRow,
        props.selected ? styles.selectedRow : [],
      ]}>
      {props.headers.map((h, j) => (
        <DataTableCell
          key={h}
          header={h}
          index={j}
          icon={props.icons ? props.icons[j] : null}
          item={props.item}
          rowEven={props.even}
          onPress={onPress ? () => onPress(j) : undefined}
          widths={props.widths}
          setWidths={props.setWidths}
        />
      ))}
    </View>
  );
}
