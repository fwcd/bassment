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

export function DrawerTreeItem({
  label,
  icon,
  isEditable,
  isEditFocused,
  isFocused,
  isButton,
  isExpandedInitially,
  onPress,
  onEdit,
  onSubmitEdit,
  children,
}: DrawerTreeItemProps) {
  const [isExpanded, setExpanded] = useState(isExpandedInitially ?? false);
  const globalStyles = useStyles();
  const styles = useDrawerTreeItemStyles(isFocused ?? false, isButton ?? false);
  const hasChildren = Children.count(children) > 0;

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
        {icon ? icon(globalStyles.icon) : []}
      </View>
      {isEditable ? (
        <ThemedTextField
          value={label}
          autoFocus={isEditFocused}
          onChangeText={onEdit}
          onSubmitEditing={onSubmitEdit}
        />
      ) : (
        <ThemedText>{label}</ThemedText>
      )}
    </View>
  );

  if (onPress || hasChildren) {
    item = (
      <Pressable
        onPress={() =>
          onPress && !hasChildren ? onPress() : setExpanded(!isExpanded)
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
      {isExpanded ? <View style={{ marginLeft: 10 }}>{children}</View> : []}
    </>
  );
}
