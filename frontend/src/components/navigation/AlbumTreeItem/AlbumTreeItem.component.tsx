import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialAlbum } from '@bassment/models/Album';
import React from 'react';

interface AlbumTreeItemProps {
  album: PartialAlbum;
}

export function AlbumTreeItem({ album }: AlbumTreeItemProps) {
  return <DrawerTreeItem label={album.name ?? 'Unnamed Album'} />;
}
