import { useStyles } from '@bassment/styles';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ThemedIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function ThemedIcon({ name, size, color, style }: ThemedIconProps) {
  const globalStyles = useStyles();
  return (
    <Icon
      name={name}
      size={size ?? globalStyles.icon.size}
      color={color ?? globalStyles.icon.color}
      style={style}
    />
  );
}
