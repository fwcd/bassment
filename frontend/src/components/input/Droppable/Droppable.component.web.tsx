import { DroppableProps } from '@bassment/components/input/Droppable/Droppable.props';
import { toDrops } from '@bassment/utils/dropConversions.web';
import React, { DragEventHandler, useCallback } from 'react';

export function Droppable({
  anchor,
  onDrag,
  onDrop,
  children,
}: DroppableProps) {
  const onDragIn: DragEventHandler = useCallback(
    async event => onDrag(true, await toDrops(event.dataTransfer)),
    [onDrag],
  );
  const onDragOut: DragEventHandler = useCallback(
    async event => onDrag(false, await toDrops(event.dataTransfer)),
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
      const drops = await toDrops(event.dataTransfer);

      // Finish drag and notify drop handler
      onDrag(false, drops);
      onDrop(drops);
    },
    [onDrag, onDrop],
  );

  return (
    // TODO: onDragExit only seems to work in Firefox
    <div
      onDragEnter={onDragIn}
      onDragExit={onDragOut}
      onDragEnd={onDragOut}
      onDragOver={onDragOver}
      onDrop={onDropEvent}
      style={anchor ? { position: 'relative' } : {}}>
      {children}
    </div>
  );
}
