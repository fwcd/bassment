import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialAlbum } from '@bassment/models/Album';
import React from 'react';

interface AlbumTreeItemProps {
  album: PartialAlbum;
  isFocused?: boolean;
  onFocus?: () => void;
}

export function AlbumTreeItem({
  album,
  isFocused,
  onFocus,
}: AlbumTreeItemProps) {
  return (
    <DrawerTreeItem
      label={album.name ?? 'Unnamed Album'}
      isFocused={isFocused}
      onPress={onFocus}
    />
  );
}
