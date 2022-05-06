import { SearchBar } from '@bassment/components/input/SearchBar';
import { DrawerTreeItem } from '@bassment/components/navigation/DrawerTreeItem';
import { Divider } from '@bassment/components/structure/Divider';
import { useStyles } from '@bassment/styles';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function AppSidebar(props: DrawerContentComponentProps) {
  const routeName = props.state.routeNames[props.state.index];
  const globalStyles = useStyles();
  const styles = StyleSheet.create({
    sidebar: {
      marginHorizontal: globalStyles.layout.smallSpace,
    },
  });

  return (
    <DrawerContentScrollView style={styles.sidebar}>
      <SearchBar />
      <DrawerTreeItem
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
        <DrawerTreeItem label="Test 1" onPress={() => {}} />
        <DrawerTreeItem label="Test 2">
          <DrawerTreeItem label="Nested 1" onPress={() => {}} />
        </DrawerTreeItem>
        <DrawerTreeItem label="Test 3" onPress={() => {}} />
      </DrawerTreeItem>
      <Divider />
      <DrawerTreeItem
        label="Add Playlist"
        icon={({ size, color }) => (
          <Icon name="add-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}
