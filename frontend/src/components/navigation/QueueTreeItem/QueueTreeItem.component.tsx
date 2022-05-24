import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { DropZone } from '@bassment/components/input/DropZone';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { Drop, TracksDrop } from '@bassment/models/Drop';
import { AnnotatedTrack } from '@bassment/models/Track';
import React, { useCallback } from 'react';

interface QueueTreeItemProps {
  queueLength: number;
  isFocused?: boolean;
  onFocus?: () => void;
  onEnqueue?: (tracks: AnnotatedTrack[]) => void;
}

export function QueueTreeItem({
  queueLength,
  isFocused,
  onFocus,
  onEnqueue,
}: QueueTreeItemProps) {
  const onDrop = useCallback(
    (drops: Drop[]) => {
      if (onEnqueue) {
        const tracks = drops
          .filter(drop => drop.kind === 'tracks')
          .flatMap(drop => (drop as TracksDrop).tracks);
        onEnqueue(tracks);
      }
    },
    [onEnqueue],
  );

  return (
    <DropZone onDrop={onDrop}>
      <DrawerTreeItem
        label={`Queue (${queueLength})`}
        icon={({ size, color }) => (
          <ThemedIcon name="trail-sign-outline" size={size} color={color} />
        )}
        isFocused={isFocused}
        onPress={onFocus}
      />
    </DropZone>
  );
}
