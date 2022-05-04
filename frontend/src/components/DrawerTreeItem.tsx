import { DrawerItem } from '@react-navigation/drawer';
import React, { ReactNode, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface DrawerTreeItemProps {
  label: string;
  icon?: (params: { size: number; color: string }) => ReactNode;
  onPress?: () => void;
  focused?: boolean;
  children?: ReactNode;
}

export function DrawerTreeItem(props: DrawerTreeItemProps) {
  const [isExpanded, setExpanded] = useState(false);
  const chevronStyles: ViewStyle = {
    width: 25,
    paddingEnd: 30,
  };
  return (
    <>
      <DrawerItem
        label={props.label}
        icon={iconProps => (
          <>
            {props.children ? (
              <Icon
                name={
                  isExpanded
                    ? 'chevron-down-outline'
                    : 'chevron-forward-outline'
                }
                size={iconProps.size}
                color={iconProps.color}
                style={chevronStyles}
              />
            ) : (
              <View style={chevronStyles} />
            )}
            {props.icon ? props.icon(iconProps) : []}
          </>
        )}
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
