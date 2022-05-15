import { Drop } from '@bassment/models/Drop';
import { ReactNode } from 'react';

export interface DroppableProps {
  anchor?: boolean;
  onDrag: (hovering: boolean, drops: Drop[]) => void;
  onDrop: (drops: Drop[]) => void;
  // TODO: onDrop accepting some value
  children: ReactNode;
}
