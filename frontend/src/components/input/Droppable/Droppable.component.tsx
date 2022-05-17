import { DroppableProps } from '@bassment/components/input/Droppable/Droppable.props';
import React from 'react';
import { View } from 'react-native';

export function Droppable({ children }: DroppableProps) {
  return <View>{children}</View>;
}
