import { ClickableProps } from '@bassment/components/input/Clickable/Clickable.props';
import React, { MouseEventHandler, useCallback } from 'react';

export function Clickable({
  onClick,
  onDoubleClick,
  onContextMenu,
  children,
}: ClickableProps) {
  const onContextMenuEvent: MouseEventHandler = useCallback(
    e => {
      if (onContextMenu) {
        // Prevent native context menu from opening
        e.preventDefault();
        onContextMenu();
      }
    },
    [onContextMenu],
  );

  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenuEvent}>
      {children}
    </div>
  );
}
