import { useDataTableCellStyles } from '@bassment/components/data/DataTableCell/DataTableCell.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import React, { useRef } from 'react';
import { PanResponder, View } from 'react-native';
import { Hoverable } from 'react-native-web-hooks';

interface DataTableCellProps {
  header: string;
  index: number;
  item?: { [key: string]: string };
  rowEven: boolean;
  widths: number[];
  setWidths?: (widths: number[]) => void;
  activeHandle?: number | null;
  setActiveHandle?: (index: number | null) => void;
}

export function DataTableCell(props: DataTableCellProps) {
  const styles = useDataTableCellStyles();
  const { item, index: j, setWidths } = props;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (event, gestureState) => {
        let newWidths = [...props.widths];
        newWidths[props.index] += gestureState.vx;
        if (props.setWidths) {
          console.log(props.setWidths);
          props.setWidths(newWidths);
        }
      },
    }),
  ).current;

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
      <Hoverable
        onHoverIn={() => {
          if (props.setActiveHandle) {
            props.setActiveHandle(j);
          }
        }}
        onHoverOut={() => {
          if (props.setActiveHandle) {
            props.setActiveHandle(null);
          }
        }}>
        {() => (
          <View
            style={
              props.activeHandle === j
                ? styles.activeBorderHandle
                : styles.borderHandle
            }
            {...panResponder.panHandlers}
          />
        )}
      </Hoverable>
    </>
  );
}
