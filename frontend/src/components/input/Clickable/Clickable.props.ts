import { ReactNode } from 'react';

export interface ClickableProps {
  onClick?: () => void;
  onDoubleClick?: () => void;
  onContextMenu?: () => void;
  children: ReactNode;
}
