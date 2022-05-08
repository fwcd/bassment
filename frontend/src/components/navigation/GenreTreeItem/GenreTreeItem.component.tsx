import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialGenre } from '@bassment/models/Genre';
import React from 'react';

interface GenreTreeItemProps {
  genre: PartialGenre;
}

export function GenreTreeItem({ genre }: GenreTreeItemProps) {
  return <DrawerTreeItem label={genre.name ?? 'Unnamed Genre'} />;
}
