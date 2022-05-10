import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialAlbum } from '@bassment/models/Album';
import React from 'react';

interface AlbumTreeItemProps {
  album: PartialAlbum;
  isFocused?: boolean;
  onFocus?: () => void;
}

export function AlbumTreeItem(props: AlbumTreeItemProps) {
  return (
    <DrawerTreeItem
      label={props.album.name ?? 'Unnamed Album'}
      isFocused={props.isFocused}
      onPress={props.onFocus}
    />
  );
}
