import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialGenre } from '@bassment/models/Genre';
import React from 'react';

interface GenreTreeItemProps {
  artist: PartialGenre;
}

export function GenreTreeItem({ artist }: GenreTreeItemProps) {
  return <DrawerTreeItem label={artist.name ?? 'Unnamed Genre'} />;
}
