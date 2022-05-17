import { ThemedIcon } from '@bassment/components/display/ThemedIcon';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { ThemedTextField } from '@bassment/components/input/ThemedTextField';
import { useDrawerTreeItemStyles } from '@bassment/components/navigation/DrawerTreeItem/DrawerTreeItem.style';
import { useStyles } from '@bassment/styles';
import React, { Children, ReactNode, useState } from 'react';
import { Pressable, View } from 'react-native';

interface IconProps {
  size: number;
  color: string;
}

interface DrawerTreeItemProps {
  label: string;
  icon?: (params: IconProps) => ReactNode;
  isEditable?: boolean;
  isEditFocused?: boolean;
  isFocused?: boolean;
  isButton?: boolean;
  isExpandedInitially?: boolean;
  onPress?: () => void;
  onEdit?: (label: string) => void;
  onSubmitEdit?: () => void;
  children?: ReactNode;
}

export function DrawerTreeItem(props: DrawerTreeItemProps) {
  const [isExpanded, setExpanded] = useState(
    props.isExpandedInitially ?? false,
  );
  const globalStyles = useStyles();
  const styles = useDrawerTreeItemStyles(
    props.isFocused ?? false,
    props.isButton ?? false,
  );
  const hasChildren = Children.count(props.children) > 0;

  let item = (
    <View style={styles.item}>
      <View style={styles.icons}>
        {hasChildren ? (
          <ThemedIcon
            name={
              isExpanded ? 'chevron-down-outline' : 'chevron-forward-outline'
            }
            style={styles.chevron}
          />
        ) : (
          <View style={styles.chevron} />
        )}
        {props.icon ? props.icon(globalStyles.icon) : []}
      </View>
      {props.isEditable ? (
        <ThemedTextField
          value={props.label}
          autoFocus={props.isEditFocused}
          onChangeText={props.onEdit}
          onSubmitEditing={props.onSubmitEdit}
        />
      ) : (
        <ThemedText>{props.label}</ThemedText>
      )}
    </View>
  );

  if (props.onPress || hasChildren) {
    item = (
      <Pressable
        onPress={() =>
          props.onPress && !hasChildren
            ? props.onPress()
            : setExpanded(!isExpanded)
        }
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        {item}
      </Pressable>
    );
  }

  return (
    <>
      {item}
      {isExpanded ? (
        <View style={{ marginLeft: 10 }}>{props.children}</View>
      ) : (
        []
      )}
    </>
  );
}
