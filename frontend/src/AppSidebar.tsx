import { HorizontalDivider } from '@bassment/components/HorizontalDivider';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';

export function AppSidebar(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <HorizontalDivider />
    </DrawerContentScrollView>
  );
}
