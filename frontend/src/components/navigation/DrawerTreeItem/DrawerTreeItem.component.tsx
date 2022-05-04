import { ThemedText } from '@bassment/components/display/ThemedText';
import { useTheme } from '@react-navigation/native';
import React, { ReactNode, useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IconProps {
  size: number;
  color: string;
}

interface DrawerTreeItemProps {
  label: string;
  icon?: (params: IconProps) => ReactNode;
  onPress?: () => void;
  focused?: boolean;
  isExpandedInitially?: boolean;
  children?: ReactNode;
}

export function DrawerTreeItem(props: DrawerTreeItemProps) {
  const [isExpanded, setExpanded] = useState(
    props.isExpandedInitially || false,
  );
  const chevronStyles: ViewStyle = {
    width: 25,
    paddingEnd: 15,
  };
  const theme = useTheme();
  const iconProps: IconProps = {
    // TODO: Proper font styling, larger fonts on mobile?
    size: 16,
    color: theme.colors.text,
  };
  // TODO: Background, focused colors, etc
  return (
    <>
      <Pressable
        onPress={() =>
          props.onPress ? props.onPress() : setExpanded(!isExpanded)
        }
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
          <View style={{ flexDirection: 'row', paddingEnd: 10 }}>
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
          </View>
          <ThemedText>{props.label}</ThemedText>
        </View>
      </Pressable>
      {isExpanded ? (
        <View style={{ marginLeft: 10 }}>{props.children}</View>
      ) : (
        []
      )}
    </>
  );
}
