import { useDataTableCellStyles } from '@bassment/components/data/DataTableCell/DataTableCell.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import React, { useState } from 'react';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

interface DataTableCellProps {
  header: string;
  index: number;
  item?: { [key: string]: string };
  rowEven: boolean;
  widths: number[];
  setWidths?: (widths: number[]) => void;
}

export function DataTableCell(props: DataTableCellProps) {
  const styles = useDataTableCellStyles();
  const { item, index: j } = props;
  const [startWidth, setStartWidth] = useState(props.widths[j]);

  return (
    <>
      <View
        style={[
          styles.cell,
          ...(!props.rowEven && j % 2 === 0 ? [styles.evenCell] : []),
          { width: props.widths[j] },
        ]}>
        <ThemedText style={item ? [] : [{ fontWeight: 'bold' }]}>
          {item ? item[props.header] : props.header}
        </ThemedText>
      </View>
      <PanGestureHandler
        onGestureEvent={({ nativeEvent: event }) => {
          if (props.setWidths) {
            let widths = [...props.widths];
            widths[j] = startWidth + event.translationX;
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
