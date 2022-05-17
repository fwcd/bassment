import { DropZone } from '@bassment/components/input/DropZone';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { Tag } from '@bassment/models/Tag';
import React, { useCallback } from 'react';

interface TagTreeItemProps {
  tag: Tag;
  isFocused?: boolean;
  onFocus?: () => void;
}

export function TagTreeItem({ tag, isFocused, onFocus }: TagTreeItemProps) {
  // TODO: Implement onDrop
  const onDrop = useCallback(() => {}, []);

  return (
    <DropZone onDrop={onDrop}>
      <DrawerTreeItem
        label={tag.value ?? 'Anonymous Tag'}
        isFocused={isFocused}
        onPress={onFocus}
      />
    </DropZone>
  );
}
