import { Dropzone } from '@bassment/components/input/Dropzone';
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
    <Dropzone onDrop={onDrop}>
      <DrawerTreeItem
        label={tag.value ?? 'Anonymous Tag'}
        isFocused={isFocused}
        onPress={onFocus}
      />
    </Dropzone>
  );
}
