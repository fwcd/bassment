import { useStyles } from '@bassment/styles';
import React from 'react';
import { View } from 'react-native';

// TODO: Maybe move this to another folder, since this is a concrete implementation/extension
export function HorizontalDivider() {
  const styles = useStyles();

  return (
    <View style={[styles.margin, styles.border, { borderBottomWidth: 1 }]} />
  );
}
