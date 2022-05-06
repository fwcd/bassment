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

export function ThemedIcon(props: ThemedIconProps) {
  const globalStyles = useStyles();
  return (
    <Icon
      name={props.name}
      size={props.size ?? globalStyles.icon.size}
      color={props.color ?? globalStyles.icon.color}
      style={props.style}
    />
  );
}
