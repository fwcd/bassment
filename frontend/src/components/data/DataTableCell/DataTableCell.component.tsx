import { useDataTableCellStyles } from '@bassment/components/data/DataTableCell/DataTableCell.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { Clickable } from '@bassment/components/input/Clickable';
import React, { ReactNode, useCallback, useState } from 'react';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

interface DataTableCellProps {
  colIndex: number;
  header: string;
  icon?: ReactNode;
  item?: { [key: string]: string | number };
  widths: number[];
  setWidths?: (widths: number[]) => void;
  onClick?: () => void;
}

export function DataTableCell({
  colIndex,
  header,
  icon,
  item,
  widths,
  setWidths,
  onClick,
}: DataTableCellProps) {
  const styles = useDataTableCellStyles();

  const width = widths[colIndex];
  const [startWidth, setStartWidth] = useState(width);
  const minWidth = 40;

  const cell = (
    <View style={[styles.cell, { width }]}>
      {icon}
      <ThemedText style={item ? null : styles.headerText}>
        {item ? `${item[header]}` : header}
      </ThemedText>
    </View>
  );

  const onGestureEvent = useCallback(
    ({ nativeEvent: event }) => {
      if (setWidths) {
        let newWidths = [...widths];
        newWidths[colIndex] = Math.max(
          minWidth,
          startWidth + event.translationX,
        );
        setWidths(newWidths);
      }
    },
    [setWidths, startWidth, colIndex, widths],
  );

  const onEnded = useCallback(() => {
    setStartWidth(width);
  }, [width]);

  return (
    <>
      {onClick ? <Clickable onClick={onClick}>{cell}</Clickable> : cell}
      <PanGestureHandler
        minDist={0}
        activeOffsetX={0}
        onGestureEvent={onGestureEvent}
        onEnded={onEnded}>
        <Animated.View style={styles.borderHandle} />
      </PanGestureHandler>
    </>
  );
}
