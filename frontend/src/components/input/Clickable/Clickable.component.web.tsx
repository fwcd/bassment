import { ClickableProps } from '@bassment/components/input/Clickable/Clickable.props';
import React from 'react';

export function Clickable(props: ClickableProps) {
  return <div onClick={props.onClick}>{props.children}</div>;
}
