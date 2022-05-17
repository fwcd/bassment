import { Dropzone } from '@bassment/components/input/Dropzone';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PlaylistKindIcon } from '@bassment/components/navigation/PlaylistKindIcon';
import { Playlist, PlaylistTreeNode } from '@bassment/models/Playlist';
import { PlaylistKind } from '@bassment/models/PlaylistKind';
import React, { useCallback } from 'react';

interface PlaylistTreeItemProps {
  playlist: PlaylistTreeNode | Playlist;
  // TODO: Use ids for editable too to permit editing nested elements
  isEditable?: boolean;
  isEditFocused?: boolean;
  focusedId?: number;
  onFocus?: (playlist: Playlist) => void;
  onEdit?: (playlist: Playlist) => void;
  onSubmitEdit?: () => void;
}

export function PlaylistTreeItem({
  playlist,
  isEditable,
  isEditFocused,
  focusedId,
  onFocus,
  onEdit,
  onSubmitEdit,
}: PlaylistTreeItemProps) {
  // TODO: Implement onDrop
  const onDrop = useCallback(() => {}, []);

  return (
    <Dropzone onDrop={onDrop}>
      <DrawerTreeItem
        label={playlist.name ?? 'Unnamed Playlist'}
        isFocused={focusedId !== undefined && focusedId === playlist.id}
        isEditable={isEditable}
        isEditFocused={isEditFocused}
        isExpandedInitially
        icon={({ size, color }) => (
          <PlaylistKindIcon
            kind={playlist.kind ?? PlaylistKind.Playlist}
            size={size}
            color={color}
          />
        )}
        onPress={
          playlist.id && !isEditable
            ? () => {
                if (onFocus) {
                  onFocus!(playlist);
                }
              }
            : undefined
        }
        onEdit={name => {
          if (onEdit) {
            onEdit({ ...playlist, name });
          }
        }}
        onSubmitEdit={onSubmitEdit}>
        {'children' in playlist
          ? playlist.children.map(child => (
              <PlaylistTreeItem
                key={child.id}
                playlist={child}
                focusedId={focusedId}
                onFocus={onFocus}
              />
            ))
          : null}
      </DrawerTreeItem>
    </Dropzone>
  );
}
