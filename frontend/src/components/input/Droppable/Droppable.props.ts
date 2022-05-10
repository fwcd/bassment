import { Drop } from '@bassment/models/Drop';
import { ReactNode } from 'react';

export interface DroppableProps {
  onDrag: (hovering: boolean) => void;
  onDrop: (value: Drop) => void;
  // TODO: onDrop accepting some value
  children: ReactNode;
}
