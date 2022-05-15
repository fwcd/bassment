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

export function PlaylistTreeItem(props: PlaylistTreeItemProps) {
  const { playlist } = props;

  const onDrop = useCallback(() => {}, []);

  return (
    <Dropzone onDrop={onDrop}>
      <DrawerTreeItem
        key={playlist.id}
        label={playlist.name ?? 'Unnamed Playlist'}
        isFocused={
          props.focusedId !== undefined && props.focusedId === playlist.id
        }
        isEditable={props.isEditable}
        isEditFocused={props.isEditFocused}
        isExpandedInitially
        icon={({ size, color }) => (
          <PlaylistKindIcon
            kind={playlist.kind ?? PlaylistKind.Playlist}
            size={size}
            color={color}
          />
        )}
        onPress={
          playlist.id && !props.isEditable
            ? () => {
                if (props.onFocus) {
                  props.onFocus!(playlist);
                }
              }
            : undefined
        }
        onEdit={name => {
          if (props.onEdit) {
            props.onEdit({ ...playlist, name });
          }
        }}
        onSubmitEdit={props.onSubmitEdit}>
        {'children' in playlist
          ? playlist.children.map(child => (
              <PlaylistTreeItem
                key={child.id}
                playlist={child}
                focusedId={props.focusedId}
                onFocus={props.onFocus}
              />
            ))
          : null}
      </DrawerTreeItem>
    </Dropzone>
  );
}
