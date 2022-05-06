import { useDataTableCellStyles } from '@bassment/components/data/DataTableCell/DataTableCell.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import React, { ReactNode, useState } from 'react';
import { Pressable, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

interface DataTableCellProps {
  index: number;
  header: string;
  icon?: ReactNode;
  item?: { [key: string]: string };
  onPress?: () => void;
  rowEven?: boolean;
  widths: number[];
  setWidths?: (widths: number[]) => void;
}

export function DataTableCell(props: DataTableCellProps) {
  const styles = useDataTableCellStyles();
  const { item, index: j } = props;

  const [startWidth, setStartWidth] = useState(props.widths[j]);
  const minWidth = 40;

  return (
    <>
      <Pressable onPress={props.onPress}>
        <View
          style={[
            styles.cell,
            ...(!props.rowEven && j % 2 === 0 ? [styles.evenCell] : []),
            { width: props.widths[j] },
          ]}>
          {props.icon}
          <ThemedText style={item ? [] : [{ fontWeight: 'bold' }]}>
            {item ? item[props.header] : props.header}
          </ThemedText>
        </View>
      </Pressable>
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
