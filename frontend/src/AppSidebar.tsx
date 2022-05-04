import { DrawerTreeItem } from '@bassment/components/DrawerTreeItem';
import { HorizontalDivider } from '@bassment/components/HorizontalDivider';
import { SearchBar } from '@bassment/components/SearchBar';
import { ThemedText } from '@bassment/components/ThemedText';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export function AppSidebar(props: DrawerContentComponentProps) {
  const routeName = props.state.routeNames[props.state.index];
  return (
    <DrawerContentScrollView>
      <SearchBar />
      <DrawerItem
        label="Tracks"
        icon={({ size, color }) => (
          <Icon name="musical-notes-outline" size={size} color={color} />
        )}
        focused={routeName === 'Tracks'}
        onPress={() => {
          props.navigation.navigate('Tracks');
        }}
      />
      <DrawerTreeItem
        label="Albums"
        icon={({ size, color }) => (
          <Icon name="albums-outline" size={size} color={color} />
        )}>
        <DrawerItem label="Test 1" onPress={() => {}} />
        <DrawerTreeItem label="Test 2">
          <DrawerItem label="Nested 1" onPress={() => {}} />
        </DrawerTreeItem>
        <DrawerItem label="Test 3" onPress={() => {}} />
      </DrawerTreeItem>
      <HorizontalDivider />
    </DrawerContentScrollView>
  );
}
