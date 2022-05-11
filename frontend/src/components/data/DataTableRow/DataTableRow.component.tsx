import { DataTableCell } from '@bassment/components/data/DataTableCell';
import { useDataTableRowStyles } from '@bassment/components/data/DataTableRow/DataTableRow.style';
import { Clickable } from '@bassment/components/input/Clickable';
import { Hoverable } from '@bassment/components/input/Hoverable';
import React, { ReactNode, useCallback, useState } from 'react';
import { View } from 'react-native';

interface DataTableRowProps {
  headers: string[];
  icons?: ReactNode[];
  item?: { [key: string]: string | number };
  even?: boolean;
  hoverable?: boolean;
  selected?: boolean;
  widths: number[];
  setWidths?: (widths: number[]) => void;
  onClick?: () => void;
  onDoubleClick?: () => void;
  onClickCell?: (index: number) => void;
}

export function DataTableRow({
  headers,
  icons,
  item,
  even,
  hoverable,
  selected,
  widths,
  setWidths,
  onClick,
  onDoubleClick,
  onClickCell,
}: DataTableRowProps) {
  const styles = useDataTableRowStyles();
  const [hovered, setHovered] = useState(false);

  let row = (
    <View
      style={[
        styles.row,
        item ? (even ? styles.evenRow : styles.oddRow) : styles.headerRow,
        hovered ? styles.hoveredRow : [],
        selected ? styles.selectedRow : [],
      ]}>
      {headers.map((h, j) => (
        <DataTableCell
          key={h}
          header={h}
          colIndex={j}
          icon={icons ? icons[j] : null}
          item={item}
          onClick={onClickCell ? () => onClickCell(j) : undefined}
          widths={widths}
          setWidths={setWidths}
        />
      ))}
    </View>
  );

  const onHoverIn = useCallback(() => setHovered(true), []);
  const onHoverOut = useCallback(() => setHovered(false), []);

  if (hoverable) {
    row = (
      <Hoverable onHoverIn={onHoverIn} onHoverOut={onHoverOut}>
        {row}
      </Hoverable>
    );
  }

  if (onClick || onDoubleClick) {
    row = (
      <Clickable onClick={onClick} onDoubleClick={onDoubleClick}>
        {row}
      </Clickable>
    );
  }

  return row;
}
