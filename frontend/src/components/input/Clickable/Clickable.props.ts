import { ReactNode } from 'react';

export interface ClickableProps {
  onClick: () => void;
  children: ReactNode;
}
