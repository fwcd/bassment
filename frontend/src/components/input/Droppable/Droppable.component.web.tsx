import { DroppableProps } from '@bassment/components/input/Droppable/Droppable.props';
import { DropFile } from '@bassment/models/Drop';
import React, { DragEventHandler, useCallback } from 'react';

export function Droppable({ onDrag, onDrop, children }: DroppableProps) {
  const onDragIn = useCallback(() => onDrag(true), [onDrag]);
  const onDragOut = useCallback(() => onDrag(false), [onDrag]);

  const onDropEvent: DragEventHandler = useCallback(
    event => {
      const transfer = event.dataTransfer;

      if (transfer.files.length > 0) {
        const files: DropFile[] = [];

        for (let i = 0; i < transfer.files.length; i++) {
          const file = transfer.files[i];
          files.push({
            name: file.name,
            size: file.size,
            content: file.arrayBuffer,
          });
        }

        onDrop({ type: 'file', files });
      } else if (transfer.items.length > 0) {
        const items: any[] = [];

        for (let i = 0; i < transfer.items.length; i++) {
          items.push(transfer.items[i]);
        }

        onDrop({ type: 'item', items });
      }
    },
    [onDrop],
  );

  return (
    <div
      onDragEnter={onDragIn}
      onDragExit={onDragOut}
      onDragEnd={onDragOut}
      onDrop={onDropEvent}>
      {children}
    </div>
  );
}
