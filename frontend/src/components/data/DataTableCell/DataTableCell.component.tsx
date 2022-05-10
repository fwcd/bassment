import { useDataTableCellStyles } from '@bassment/components/data/DataTableCell/DataTableCell.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { Clickable } from '@bassment/components/input/Clickable';
import React, { ReactNode, useState } from 'react';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

interface DataTableCellProps {
  index: number;
  header: string;
  icon?: ReactNode;
  item?: { [key: string]: string | number };
  onClick?: () => void;
  rowEven?: boolean;
  widths: number[];
  setWidths?: (widths: number[]) => void;
}

export function DataTableCell(props: DataTableCellProps) {
  const styles = useDataTableCellStyles();
  const { item, index: j } = props;

  const [startWidth, setStartWidth] = useState(props.widths[j]);
  const minWidth = 40;

  const cell = (
    <View style={[styles.cell, { width: props.widths[j] }]}>
      {props.icon}
      <ThemedText style={item ? null : styles.headerText}>
        {item ? `${item[props.header]}` : props.header}
      </ThemedText>
    </View>
  );

  return (
    <>
      {props.onClick ? (
        <Clickable onClick={props.onClick}>{cell}</Clickable>
      ) : (
        cell
      )}
      <PanGestureHandler
        minDist={0}
        activeOffsetX={0}
        onGestureEvent={({ nativeEvent: event }) => {
          if (props.setWidths) {
            let widths = [...props.widths];
            widths[j] = Math.max(minWidth, startWidth + event.translationX);
            props.setWidths(widths);
          }
        }}
        onEnded={() => {
          setStartWidth(props.widths[j]);
        }}>
        <Animated.View style={styles.borderHandle} />
      </PanGestureHandler>
    </>
  );
}
