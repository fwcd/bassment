import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { AnnotatedTrack } from '@bassment/models/Track';
import React from 'react';

interface HistoryTreeItemProps {
  isFocused?: boolean;
  onFocus?: () => void;
  onEnqueue?: (tracks: AnnotatedTrack[]) => void;
}

export function HistoryTreeItem({ isFocused, onFocus }: HistoryTreeItemProps) {
  return (
    <DrawerTreeItem
      label="History"
      icon={({ size, color }) => (
        <ThemedIcon name="time-outline" size={size} color={color} />
      )}
      isFocused={isFocused}
      onPress={onFocus}
    />
  );
}
