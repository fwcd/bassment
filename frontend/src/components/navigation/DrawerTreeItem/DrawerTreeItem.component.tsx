import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { useDrawerTreeItemStyles } from '@bassment/components/navigation/DrawerTreeItem/DrawerTreeItem.style';
import { useStyles } from '@bassment/styles';
import React, { ReactNode, useState } from 'react';
import { Pressable, View } from 'react-native';

interface IconProps {
  size: number;
  color: string;
}

interface DrawerTreeItemProps {
  label: string;
  icon?: (params: IconProps) => ReactNode;
  onPress?: () => void;
  focused?: boolean;
  isButton?: boolean;
  isExpandedInitially?: boolean;
  children?: ReactNode;
}

export function DrawerTreeItem(props: DrawerTreeItemProps) {
  const [isExpanded, setExpanded] = useState(
    props.isExpandedInitially ?? false,
  );
  const globalStyles = useStyles();
  const styles = useDrawerTreeItemStyles(
    props.focused ?? false,
    props.isButton ?? false,
  );
  return (
    <>
      <Pressable
        onPress={() =>
          props.onPress ? props.onPress() : setExpanded(!isExpanded)
        }
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <View style={styles.item}>
          <View style={styles.icons}>
            {props.children &&
            (Array.isArray(props.children)
              ? props.children.length > 0
              : true) ? (
              <ThemedIcon
                name={
                  isExpanded
                    ? 'chevron-down-outline'
                    : 'chevron-forward-outline'
                }
                style={styles.chevron}
              />
            ) : (
              <View style={styles.chevron} />
            )}
            {props.icon ? props.icon(globalStyles.icon) : []}
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
