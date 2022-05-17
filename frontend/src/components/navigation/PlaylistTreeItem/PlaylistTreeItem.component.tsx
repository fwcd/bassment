import { ContextMenuZone } from '@bassment/components/input/ContextMenuZone/ContextMenuZone.component.web';
import { DropZone } from '@bassment/components/input/DropZone';
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
  onDelete?: (playlist: Playlist) => void;
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
  onDelete,
}: PlaylistTreeItemProps) {
  // TODO: Implement onDrop
  const onDrop = useCallback(() => {}, []);

  return (
    <DropZone onDrop={onDrop}>
      <ContextMenuZone
        options={[
          {
            label: 'Delete Playlist',
            onSelect: () => {
              if (onDelete) {
                onDelete(playlist);
              }
            },
          },
        ]}>
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
                  onDelete={onDelete}
                />
              ))
            : null}
        </DrawerTreeItem>
      </ContextMenuZone>
    </DropZone>
  );
}
