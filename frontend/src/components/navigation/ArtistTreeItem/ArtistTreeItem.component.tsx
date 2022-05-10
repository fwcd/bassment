import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialArtist } from '@bassment/models/Artist';
import React from 'react';

interface ArtistTreeItemProps {
  artist: PartialArtist;
  isFocused?: boolean;
  onFocus?: () => void;
}

export function ArtistTreeItem(props: ArtistTreeItemProps) {
  return (
    <DrawerTreeItem
      label={props.artist.name ?? 'Unnamed Artist'}
      isFocused={props.isFocused}
      onPress={props.onFocus}
    />
  );
}
