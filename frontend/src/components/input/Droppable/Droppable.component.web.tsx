import { DroppableProps } from '@bassment/components/input/Droppable/Droppable.props';
import { DropFile } from '@bassment/models/Drop';
import React, { DragEventHandler, useCallback } from 'react';

export function Droppable({ onDrag, onDrop, children }: DroppableProps) {
  const onDragIn = useCallback(() => onDrag(true), [onDrag]);
  const onDragOut = useCallback(() => onDrag(false), [onDrag]);

  const onDragOver: DragEventHandler = useCallback(event => {
    // Prevent file from being opened
    event.preventDefault();
  }, []);

  const onDropEvent: DragEventHandler = useCallback(
    event => {
      // Finish drag
      onDrag(false);

      // Prevent file from being opened
      event.preventDefault();

      // Extract the transferred data and process it
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
      onDragOver={onDragOver}
      onDrop={onDropEvent}>
      {children}
    </div>
  );
}
