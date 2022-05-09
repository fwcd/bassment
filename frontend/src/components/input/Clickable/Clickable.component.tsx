import { ClickableProps } from '@bassment/components/input/Clickable/Clickable.props';
import React from 'react';
import { Pressable } from 'react-native';

export function Clickable(props: ClickableProps) {
  // TODO: How do we deal with double clicks e.g. on mobile?
  return <Pressable onPress={props.onClick}>{props.children}</Pressable>;
}
