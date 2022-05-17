import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { PlaylistKind } from '@bassment/models/PlaylistKind';
import React from 'react';

interface PlaylistKindIconProps {
  kind: PlaylistKind;
  size?: number;
  color?: string;
}

export function PlaylistKindIcon({ kind, size, color }: PlaylistKindIconProps) {
  let iconName: string;

  switch (kind) {
    case PlaylistKind.Playlist:
      iconName = 'list-outline';
      break;
    case PlaylistKind.Crate:
      iconName = 'file-tray-outline';
      break;
    case PlaylistKind.Folder:
      iconName = 'folder-outline';
      break;
    case PlaylistKind.SetLog:
      iconName = 'time-outline';
      break;
  }

  return <ThemedIcon name={iconName} size={size} color={color} />;
}
