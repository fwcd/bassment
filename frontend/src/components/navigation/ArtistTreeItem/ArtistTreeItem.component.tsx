import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialArtist } from '@bassment/models/Artist';
import React from 'react';

interface ArtistTreeItemProps {
  artist: PartialArtist;
  isFocused?: boolean;
  onFocus?: () => void;
}

export function ArtistTreeItem({
  artist,
  isFocused,
  onFocus,
}: ArtistTreeItemProps) {
  return (
    <DrawerTreeItem
      label={artist.name ?? 'Unnamed Artist'}
      isFocused={isFocused}
      onPress={onFocus}
    />
  );
}
