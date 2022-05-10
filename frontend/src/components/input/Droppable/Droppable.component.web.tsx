import { DroppableProps } from '@bassment/components/input/Droppable/Droppable.props';
import { Drop } from '@bassment/models/Drop';
import React, { DragEventHandler, useCallback } from 'react';

/** Converts a data transfer (from the DOM API) to a Drop (from our model). */
async function dropsOf(transfer: DataTransfer): Promise<Drop[]> {
  const drops: Drop[] = [];

  for (let i = 0; i < transfer.items.length; i++) {
    const item = transfer.items[i];
    switch (item.kind) {
      case 'file':
        const file = item.getAsFile() ?? undefined;
        drops.push({ kind: 'file', file });
        break;
      default:
        // TODO: More fine-grained drop types rather than just dumping the item in here
        drops.push({ kind: 'any', value: item });
        break;
    }
  }

  return drops;
}

export function Droppable({ onDrag, onDrop, children }: DroppableProps) {
  const onDragIn: DragEventHandler = useCallback(
    async event => onDrag(true, await dropsOf(event.dataTransfer)),
    [onDrag],
  );
  const onDragOut: DragEventHandler = useCallback(
    async event => onDrag(false, await dropsOf(event.dataTransfer)),
    [onDrag],
  );

  const onDragOver: DragEventHandler = useCallback(event => {
    // Prevent file from being opened
    event.preventDefault();
  }, []);

  const onDropEvent: DragEventHandler = useCallback(
    async event => {
      // Prevent file from being opened
      event.preventDefault();

      // Extract the transferred data
      const drops = await dropsOf(event.dataTransfer);

      // Finish drag and notify drop handler
      onDrag(false, drops);
      onDrop(drops);
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
