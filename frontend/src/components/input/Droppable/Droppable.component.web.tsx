import { DroppableProps } from '@bassment/components/input/Droppable/Droppable.props';
import React from 'react';

export function Droppable(props: DroppableProps) {
  return <div>{props.children}</div>;
}
