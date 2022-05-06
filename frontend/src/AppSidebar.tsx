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
        label="Artists"
        icon={({ size, color }) => (
          <Icon name="person-outline" size={size} color={color} />
        )}>
        <DrawerTreeItem label="Pop" onPress={() => {}} />
        <DrawerTreeItem label="House" onPress={() => {}} />
      </DrawerTreeItem>
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
      <DrawerTreeItem
        label="Genres"
        icon={({ size, color }) => (
          <Icon name="star-outline" size={size} color={color} />
        )}>
        <DrawerTreeItem label="Pop" onPress={() => {}} />
        <DrawerTreeItem label="House" onPress={() => {}} />
      </DrawerTreeItem>
      <DrawerTreeItem
        label="Streams"
        icon={({ size, color }) => (
          <Icon name="radio-outline" size={size} color={color} />
        )}
      />
      <Divider />
      <DrawerTreeItem
        label="Test 1"
        isExpandedInitially
        icon={({ size, color }) => (
          <Icon name="folder-outline" size={size} color={color} />
        )}>
        <DrawerTreeItem
          label="Stuff"
          isExpandedInitially
          icon={({ size, color }) => (
            <Icon name="folder-outline" size={size} color={color} />
          )}>
          <DrawerTreeItem
            label="Test 1"
            icon={({ size, color }) => (
              <Icon name="list-outline" size={size} color={color} />
            )}
          />
          <DrawerTreeItem
            label="Test 2"
            icon={({ size, color }) => (
              <Icon name="list-outline" size={size} color={color} />
            )}
          />
          <DrawerTreeItem
            label="Some Crate"
            icon={({ size, color }) => (
              <Icon name="file-tray-outline" size={size} color={color} />
            )}
          />
        </DrawerTreeItem>
      </DrawerTreeItem>
      <Divider />
      <DrawerTreeItem
        label="Add Playlist"
        isButton
        icon={({ size, color }) => (
          <Icon name="add-outline" size={size} color={color} />
        )}
      />
      <DrawerTreeItem
        label="Add Folder"
        isButton
        icon={({ size, color }) => (
          <Icon name="add-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}
