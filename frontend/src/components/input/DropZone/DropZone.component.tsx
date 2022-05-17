import { ThemedText } from '@bassment/components/display/ThemedText';
import { Droppable } from '@bassment/components/input/Droppable';
import { useDropZoneStyles } from '@bassment/components/input/DropZone/DropZone.style';
import { Drop } from '@bassment/models/Drop';
import React, { ReactNode, useCallback, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

interface DropZoneProps {
  label?: string;
  stretch?: boolean;
  filterDrop?: (drops: Drop[]) => boolean;
  onDrop: (drops: Drop[]) => void;
  children: ReactNode;
}

export function DropZone({
  label,
  stretch,
  filterDrop,
  onDrop,
  children,
}: DropZoneProps) {
  const styles = useDropZoneStyles((label?.length ?? 0) > 0);
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

  const [size, setSize] = useState<[number, number]>();
  const sizeStyle = size ? { width: size[0], height: size[1] } : null;

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize([width, height]);
  }, []);

  return (
    <Droppable
      onDrag={onDragCallback}
      onDrop={onDropCallback}
      anchor={!stretch}>
      <View style={[stretch ? styles.stretch : null]} onLayout={onLayout}>
        {children}
      </View>
      {isHovering ? (
        <View style={[sizeStyle, styles.overlay]} pointerEvents="none">
          {label ? <ThemedText style={styles.label}>{label}</ThemedText> : null}
        </View>
      ) : null}
    </Droppable>
  );
}
