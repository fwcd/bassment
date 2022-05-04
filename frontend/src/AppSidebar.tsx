import { HorizontalDivider } from '@bassment/components/HorizontalDivider';
import { SearchBar } from '@bassment/components/SearchBar';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';

export function AppSidebar(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView>
      <SearchBar />
      <DrawerItemList {...props} />
      <HorizontalDivider />
    </DrawerContentScrollView>
  );
}
