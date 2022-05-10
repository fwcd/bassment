import { ThemedText } from '@bassment/components/display/ThemedText';
import { Droppable } from '@bassment/components/input/Droppable';
import { useDropzoneStyles } from '@bassment/components/input/Dropzone/Dropzone.style';
import React, { ReactNode, useCallback, useState } from 'react';
import { View, ViewStyle } from 'react-native';

interface DropzoneProps {
  label?: string;
  style?: ViewStyle | ViewStyle[];
  children: ReactNode;
}

export function Dropzone(props: DropzoneProps) {
  const styles = useDropzoneStyles();
  const [isHovering, setHovering] = useState(false);

  // TODO
  const onDrop = useCallback(() => {}, []);

  return (
    <Droppable onDrag={setHovering} onDrop={onDrop}>
      <View style={[styles.item, styles.background]}>{props.children}</View>
      {isHovering ? (
        <View style={[styles.item, styles.overlay]} pointerEvents="none">
          {props.label ? (
            <ThemedText style={styles.label}>{props.label}</ThemedText>
          ) : null}
        </View>
      ) : null}
    </Droppable>
  );
}
