import { DroppableProps } from '@bassment/components/input/Droppable/Droppable.props';
import { Drop, DropFile } from '@bassment/models/Drop';
import React, { DragEventHandler, useCallback } from 'react';

/** Converts a data transfer (from the DOM API) to a Drop (from our model). */
function dropOf(transfer: DataTransfer): Drop | undefined {
  if (transfer.files.length > 0) {
    // Create a file drop
    const files: DropFile[] = [];
    for (let i = 0; i < transfer.files.length; i++) {
      const file = transfer.files[i];
      files.push({
        name: file.name,
        size: file.size,
        content: file.arrayBuffer,
      });
    }
    return { type: 'file', files };
  } else if (transfer.items.length > 0) {
    // Create an item drop
    const items: any[] = [];
    for (let i = 0; i < transfer.items.length; i++) {
      items.push(transfer.items[i]);
    }
    return { type: 'item', items };
  }
  return undefined;
}

export function Droppable({ onDrag, onDrop, children }: DroppableProps) {
  const onDragIn: DragEventHandler = useCallback(
    event => onDrag(true, dropOf(event.dataTransfer)),
    [onDrag],
  );
  const onDragOut: DragEventHandler = useCallback(
    event => onDrag(false, dropOf(event.dataTransfer)),
    [onDrag],
  );

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
      const drop = dropOf(event.dataTransfer);
      if (drop) {
        onDrop(drop);
      }
    },
    [onDrag, onDrop],
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
