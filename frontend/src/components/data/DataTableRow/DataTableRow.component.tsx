import { DataTableCell } from '@bassment/components/data/DataTableCell';
import { useDataTableRowStyles } from '@bassment/components/data/DataTableRow/DataTableRow.style';
import { Clickable } from '@bassment/components/input/Clickable';
import { Hoverable } from '@bassment/components/input/Hoverable';
import React, { ReactNode, useState } from 'react';
import { View } from 'react-native';

interface DataTableRowProps {
  headers: string[];
  icons?: ReactNode[];
  item?: { [key: string]: string };
  even?: boolean;
  hoverable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onClickCell?: (index: number) => void;
  widths: number[];
  setWidths?: (widths: number[]) => void;
}

export function DataTableRow(props: DataTableRowProps) {
  const styles = useDataTableRowStyles();
  const { onClickCell } = props;
  const [hovered, setHovered] = useState(false);

  let row = (
    <View
      style={[
        styles.row,
        props.item
          ? props.even
            ? styles.evenRow
            : styles.oddRow
          : styles.headerRow,
        hovered ? styles.hoveredRow : [],
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
          onClick={onClickCell ? () => onClickCell(j) : undefined}
          widths={props.widths}
          setWidths={props.setWidths}
        />
      ))}
    </View>
  );

  if (props.hoverable) {
    row = (
      <Hoverable
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}>
        {row}
      </Hoverable>
    );
  }

  if (props.onClick) {
    row = <Clickable onClick={props.onClick}>{row}</Clickable>;
  }

  return row;
}
