import { HoverableProps } from '@bassment/components/input/Hoverable/Hoverable.props';
import React from 'react';

export function Hoverable({ onHoverIn, onHoverOut, children }: HoverableProps) {
  return (
    <div onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
      {children}
    </div>
  );
}
