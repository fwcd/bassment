import { ThemedText } from '@bassment/components/display/ThemedText';
import React from 'react';
import { View } from 'react-native';

export function UnderConstruction() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ThemedText>Under construction...</ThemedText>
    </View>
  );
}
