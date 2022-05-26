import { ContextMenuZone } from '@bassment/components/input/ContextMenuZone/ContextMenuZone.component.web';
import { DropZone } from '@bassment/components/input/DropZone';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { PlaylistKindIcon } from '@bassment/components/navigation/PlaylistKindIcon';
import { Drop, TracksDrop } from '@bassment/models/Drop';
import { Playlist, PlaylistTreeNode } from '@bassment/models/Playlist';
import { PlaylistKind } from '@bassment/models/PlaylistKind';
import { AnnotatedTrack } from '@bassment/models/Track';
import React, { useCallback } from 'react';

interface PlaylistTreeItemProps {
  playlist: PlaylistTreeNode;
  // TODO: Use ids for editable too to permit editing nested elements
  isEditable?: boolean;
  isEditFocused?: boolean;
  focusedId?: number;
  onFocus?: (playlist: Playlist) => void;
  onEdit?: (playlist: Playlist) => void;
  onDelete?: (playlist: Playlist) => void;
  onInsert?: (playlistId: number, tracks: AnnotatedTrack[]) => void;
  onSubmitEdit?: () => void;
}

export function PlaylistTreeItem({
  playlist,
  isEditable,
  isEditFocused,
  focusedId,
  onFocus,
  onEdit,
  onInsert,
  onSubmitEdit,
  onDelete,
}: PlaylistTreeItemProps) {
  const onDrop = useCallback(
    (drops: Drop[]) => {
      if (onInsert && playlist.id) {
        const tracks = drops
          .filter(drop => drop.kind === 'tracks')
          .flatMap(drop => (drop as TracksDrop).tracks);
        onInsert(playlist.id, tracks);
      }
    },
    [playlist.id, onInsert],
  );

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
          label={`${playlist.name ?? 'Unnamed Playlist'}${
            isEditFocused || playlist.kind === PlaylistKind.Folder
              ? ''
              : ` (${playlist.trackCount})`
          }`}
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
                    onFocus(playlist);
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
                  onInsert={onInsert}
                  onDelete={onDelete}
                />
              ))
            : null}
        </DrawerTreeItem>
      </ContextMenuZone>
    </DropZone>
  );
}
