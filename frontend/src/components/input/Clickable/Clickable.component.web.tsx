import { ClickableProps } from '@bassment/components/input/Clickable/Clickable.props';
import React from 'react';

export function Clickable(props: ClickableProps) {
  return (
    <div onClick={props.onClick} onDoubleClick={props.onDoubleClick}>
      {props.children}
    </div>
  );
}
