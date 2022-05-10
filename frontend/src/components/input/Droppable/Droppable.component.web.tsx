import { DroppableProps } from '@bassment/components/input/Droppable/Droppable.props';
import React, { useCallback } from 'react';

export function Droppable({ onDrag, children }: DroppableProps) {
  const onDragIn = useCallback(() => onDrag(true), [onDrag]);
  const onDragOut = useCallback(() => onDrag(false), [onDrag]);

  return (
    <div onDragEnter={onDragIn} onDragExit={onDragOut} onDragEnd={onDragOut}>
      {children}
    </div>
  );
}
