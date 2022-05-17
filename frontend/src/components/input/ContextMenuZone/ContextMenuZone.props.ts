import { ReactNode } from 'react';

export interface ContextMenuZoneProps {
  options: {
    label: string;
    onSelect?: () => void;
  }[];
  children: ReactNode;
}
