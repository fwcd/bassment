import { CategoryIcon } from '@bassment/components/navigation/CategoryIcon';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { TagTreeItem } from '@bassment/components/navigation/TagTreeItem';
import { CategoryTreeNode } from '@bassment/models/Category';
import { KeyedTag } from '@bassment/models/Tag';
import React from 'react';

interface CategoryTreeItemProps {
  category: CategoryTreeNode;
  focusedTagId?: number;
  onFocusTag?: (tag: KeyedTag) => void;
}

export function CategoryTreeItem({
  category,
  focusedTagId,
  onFocusTag,
}: CategoryTreeItemProps) {
  return (
    <DrawerTreeItem
      key={category.id}
      label={`${category.displayName}s` ?? 'Unnamed Category'}
      icon={({ size, color }) => (
        <CategoryIcon category={category} size={size} color={color} />
      )}>
      {category.children.map(child => (
        <CategoryTreeItem
          key={child.id}
          category={child}
          focusedTagId={focusedTagId}
          onFocusTag={onFocusTag}
        />
      ))}
      {category.tags.map(tag => (
        <TagTreeItem
          tag={tag}
          isFocused={focusedTagId === tag.id}
          onFocus={() => {
            if (onFocusTag) {
              onFocusTag(tag);
            }
          }}
        />
      ))}
    </DrawerTreeItem>
  );
}
