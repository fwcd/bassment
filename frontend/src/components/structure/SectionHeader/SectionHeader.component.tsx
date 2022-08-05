import React, { ReactNode } from 'react';
import { useSectionHeaderStyles } from '@bassment/components/structure/SectionHeader/SectionHeader.style';
import { Text, View } from 'react-native';

interface SectionHeaderProps {
  label: string;
  children?: ReactNode;
}

export function SectionHeader(props: SectionHeaderProps) {
  const styles = useSectionHeaderStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      {props.children}
    </View>
  );
}
