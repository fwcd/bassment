import { DrawerItem } from '@react-navigation/drawer';
import React, { ReactNode, useState } from 'react';
import { View } from 'react-native';

interface DrawerTreeItemProps {
  label: string;
  icon?: (params: { size: number; color: string }) => ReactNode;
  onPress?: () => void;
  focused?: boolean;
  children?: ReactNode;
}

export function DrawerTreeItem(props: DrawerTreeItemProps) {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <>
      <DrawerItem
        label={props.label}
        icon={props.icon}
        focused={props.focused}
        onPress={() =>
          props.onPress ? props.onPress() : setExpanded(!isExpanded)
        }
      />
      {isExpanded ? (
        <View style={{ marginLeft: 10 }}>{props.children}</View>
      ) : (
        []
      )}
    </>
  );
}
