import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PlaylistKindIcon } from '@bassment/components/navigation/PlaylistKindIcon';
import { PlaylistTreeNode } from '@bassment/models/Playlist';
import { PlaylistKind } from '@bassment/models/PlaylistKind';
import React from 'react';

interface PlaylistTreeItemProps {
  playlist: PlaylistTreeNode;
}

export function PlaylistTreeItem({ playlist }: PlaylistTreeItemProps) {
  return (
    <DrawerTreeItem
      key={playlist.id}
      label={playlist.name ?? 'Unnamed Playlist'}
      icon={({ size, color }) => (
        <PlaylistKindIcon
          kind={playlist.kind ?? PlaylistKind.Playlist}
          size={size}
          color={color}
        />
      )}>
      {playlist.children.map(child => (
        <PlaylistTreeItem key={child.id} playlist={child} />
      ))}
    </DrawerTreeItem>
  );
}
