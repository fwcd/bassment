import { useCoverArtViewStyles } from '@bassment/components/data/CoverArtView/CoverArtView.style';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface CoverArtViewProps {
  style?: ViewStyle | ViewStyle[];
}

export function CoverArtView(props: CoverArtViewProps) {
  const styles = useCoverArtViewStyles();
  return <View style={[styles.coverArt, props.style]} />;
}
