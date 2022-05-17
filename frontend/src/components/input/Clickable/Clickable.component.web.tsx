import { ClickableProps } from '@bassment/components/input/Clickable/Clickable.props';
import React from 'react';

export function Clickable({
  onClick,
  onDoubleClick,
  children,
}: ClickableProps) {
  return (
    <div onClick={onClick} onDoubleClick={onDoubleClick}>
      {children}
    </div>
  );
}
