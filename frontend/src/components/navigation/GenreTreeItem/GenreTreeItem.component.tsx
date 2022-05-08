import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialGenre } from '@bassment/models/Genre';
import React from 'react';

interface GenreTreeItemProps {
  genre: PartialGenre;
  focused?: boolean;
  onFocus?: () => void;
}

export function GenreTreeItem(props: GenreTreeItemProps) {
  return (
    <DrawerTreeItem
      label={props.genre.name ?? 'Unnamed Genre'}
      focused={props.focused}
      onPress={props.onFocus}
    />
  );
}
