import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialAlbum } from '@bassment/models/Album';
import React from 'react';

interface AlbumTreeItemProps {
  album: PartialAlbum;
  focused?: boolean;
  onFocus?: () => void;
}

export function AlbumTreeItem(props: AlbumTreeItemProps) {
  return (
    <DrawerTreeItem
      label={props.album.name ?? 'Unnamed Album'}
      focused={props.focused}
      onPress={props.onFocus}
    />
  );
}
