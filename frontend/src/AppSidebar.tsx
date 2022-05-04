import { HorizontalDivider } from '@bassment/components/HorizontalDivider';
import { SearchBar } from '@bassment/components/SearchBar';
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
      <DrawerItem
        label="Albums"
        icon={({ size, color }) => (
          <Icon name="albums-outline" size={size} color={color} />
        )}
        focused={routeName === 'Albums'}
        onPress={() => {
          props.navigation.navigate('Albums');
        }}
      />
      <HorizontalDivider />
    </DrawerContentScrollView>
  );
}
