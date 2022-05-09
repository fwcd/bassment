import { HoverableProps } from '@bassment/components/input/Hoverable/Hoverable.props';
import React from 'react';

export function Hoverable(props: HoverableProps) {
  return (
    <div onMouseEnter={props.onHoverIn} onMouseLeave={props.onHoverOut}>
      {props.children}
    </div>
  );
}
