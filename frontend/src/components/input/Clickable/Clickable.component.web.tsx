import { ClickableProps } from '@bassment/components/input/Clickable/Clickable.props';
import React from 'react';

export function Clickable({
  onClick,
  onDoubleClick,
  onContextMenu,
  children,
}: ClickableProps) {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}>
      {children}
    </div>
  );
}
