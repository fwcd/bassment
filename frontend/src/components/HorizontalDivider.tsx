import { useStyles } from '@bassment/styles';
import React from 'react';
import { View } from 'react-native';

export function HorizontalDivider() {
  const styles = useStyles();

  return (
    <View style={[styles.margin, styles.border, { borderBottomWidth: 1 }]} />
  );
}
