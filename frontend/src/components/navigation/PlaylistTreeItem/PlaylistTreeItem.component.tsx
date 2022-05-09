import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PlaylistKindIcon } from '@bassment/components/navigation/PlaylistKindIcon';
import { Playlist, PlaylistTreeNode } from '@bassment/models/Playlist';
import { PlaylistKind } from '@bassment/models/PlaylistKind';
import React from 'react';

interface PlaylistTreeItemProps {
  playlist: PlaylistTreeNode;
  focusedId?: number;
  onFocus?: (playlist: Playlist) => void;
}

export function PlaylistTreeItem(props: PlaylistTreeItemProps) {
  const { playlist } = props;

  return (
    <DrawerTreeItem
      key={playlist.id}
      label={playlist.name ?? 'Unnamed Playlist'}
      focused={props.focusedId !== undefined && props.focusedId === playlist.id}
      isExpandedInitially
      icon={({ size, color }) => (
        <PlaylistKindIcon
          kind={playlist.kind ?? PlaylistKind.Playlist}
          size={size}
          color={color}
        />
      )}
      onPress={() => {
        if (props.onFocus && playlist.id) {
          props.onFocus(playlist);
        }
      }}>
      {playlist.children.map(child => (
        <PlaylistTreeItem
          key={child.id}
          playlist={child}
          focusedId={props.focusedId}
          onFocus={props.onFocus}
        />
      ))}
    </DrawerTreeItem>
  );
}
