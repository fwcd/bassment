import { ThemedText } from '@bassment/components/display/ThemedText';
import { Droppable } from '@bassment/components/input/Droppable';
import { useDropzoneStyles } from '@bassment/components/input/Dropzone/Dropzone.style';
import { Drop } from '@bassment/models/Drop';
import React, { ReactNode, useCallback, useState } from 'react';
import { View } from 'react-native';

interface DropzoneProps {
  label?: string;
  dropFilter?: (value: Drop) => boolean;
  onDrop: (value: Drop) => void;
  children: ReactNode;
}

export function Dropzone({
  label,
  dropFilter,
  onDrop,
  children,
}: DropzoneProps) {
  const styles = useDropzoneStyles();
  const [isHovering, setHovering] = useState(false);

  const onDragCallback = useCallback(
    (hovering: boolean, value?: Drop) => {
      if (!dropFilter || (value && dropFilter(value))) {
        setHovering(hovering);
      }
    },
    [dropFilter],
  );

  const onDropCallback = useCallback(
    (value: Drop) => {
      if (!dropFilter || dropFilter(value)) {
        onDrop(value);
      }
    },
    [dropFilter, onDrop],
  );

  return (
    <Droppable onDrag={onDragCallback} onDrop={onDropCallback}>
      <View style={[styles.item, styles.background]}>{children}</View>
      {isHovering ? (
        <View style={[styles.item, styles.overlay]} pointerEvents="none">
          {label ? <ThemedText style={styles.label}>{label}</ThemedText> : null}
        </View>
      ) : null}
    </Droppable>
  );
}
