import { Drop } from '@bassment/models/Drop';
import { ReactNode } from 'react';

export interface DroppableProps {
  onDrag: (hovering: boolean, value?: Drop) => void;
  onDrop: (value: Drop) => void;
  // TODO: onDrop accepting some value
  children: ReactNode;
}
