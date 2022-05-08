import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialAlbum } from '@bassment/models/Album';
import React from 'react';

interface AlbumTreeItemProps {
  artist: PartialAlbum;
}

export function AlbumTreeItem({ artist }: AlbumTreeItemProps) {
  return <DrawerTreeItem label={artist.name ?? 'Unnamed Album'} />;
}
