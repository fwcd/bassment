import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PartialArtist } from '@bassment/models/Artist';
import React from 'react';

interface ArtistTreeItemProps {
  artist: PartialArtist;
}

export function ArtistTreeItem({ artist }: ArtistTreeItemProps) {
  return <DrawerTreeItem label={artist.name ?? 'Unnamed Artist'} />;
}
