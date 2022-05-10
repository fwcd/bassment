import { ReactNode } from 'react';

export interface DroppableProps {
  onDrag: (hovering: boolean) => void;
  // TODO: onDrop accepting some value
  children: ReactNode;
}
