import { useDataTableRowStyles } from '@bassment/components/data/DataTableRow/DataTableRow.style';
import { ThemedText } from '@bassment/components/display/ThemedText';
import React from 'react';
import { View, Pressable } from 'react-native';
import { Hoverable } from 'react-native-web-hooks';

interface DataTableRowProps {
  even: boolean;
  headers: string[];
  widths: number[];
  activeHandle?: number | null;
  setActiveHandle?: (index: number | null) => void;
  item?: { [key: string]: string };
}

// Source: https://github.com/necolas/react-native-web/issues/1708#issuecomment-728777256
type PressableState = Readonly<{
  pressed: boolean;
  hovered?: boolean;
  focused?: boolean;
}>;

export function DataTableRow(props: DataTableRowProps) {
  const styles = useDataTableRowStyles();
  const item = props.item;

  return (
    <View style={[styles.row, props.even ? styles.evenRow : styles.oddRow]}>
      {props.headers.map((h, j) => (
        <>
          <View
            style={[
              styles.cell,
              ...(!props.even && j % 2 === 0 ? [styles.evenCell] : []),
              { width: props.widths[j] },
            ]}>
            <ThemedText style={item ? [] : [{ fontWeight: 'bold' }]}>
              {item ? item[h] : h}
            </ThemedText>
          </View>
          <Hoverable
            onHoverIn={() =>
              props.setActiveHandle ? props.setActiveHandle(j) : null
            }
            onHoverOut={() =>
              props.setActiveHandle ? props.setActiveHandle(null) : null
            }>
            {() => (
              <Pressable
                style={
                  props.activeHandle === j
                    ? styles.activeBorderHandle
                    : styles.borderHandle
                }
                onPressIn={() => {}}
                onPressOut={() => {}}
              />
            )}
          </Hoverable>
        </>
      ))}
    </View>
  );
}
