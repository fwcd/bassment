import { ThemedText } from '@bassment/components/display/ThemedText';
import { Droppable } from '@bassment/components/input/Droppable';
import { useDropzoneStyles } from '@bassment/components/input/Dropzone/Dropzone.style';
import { Drop } from '@bassment/models/Drop';
import React, { ReactNode, useCallback, useState } from 'react';
import { View } from 'react-native';

interface DropzoneProps {
  label?: string;
  filterDrop?: (drops: Drop[]) => boolean;
  onDrop: (drops: Drop[]) => void;
  children: ReactNode;
}

export function Dropzone({
  label,
  filterDrop,
  onDrop,
  children,
}: DropzoneProps) {
  const styles = useDropzoneStyles();
  const [isHovering, setHovering] = useState(false);

  const onDragCallback = useCallback(
    (hovering: boolean, drops: Drop[]) => {
      if (!filterDrop || filterDrop(drops)) {
        setHovering(hovering);
      }
    },
    [filterDrop],
  );

  const onDropCallback = useCallback(
    (drops: Drop[]) => {
      if (!filterDrop || filterDrop(drops)) {
        onDrop(drops);
      }
    },
    [filterDrop, onDrop],
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
