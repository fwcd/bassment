import { ReactNode } from 'react';

export interface HoverableProps {
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  children: ReactNode;
}
