import React from 'react';
import { useSectionHeaderStyles } from '@bassment/components/structure/SectionHeader/SectionHeader.style';
import { Text } from 'react-native';

interface SectionHeaderProps {
  label: string;
}

export function SectionHeader(props: SectionHeaderProps) {
  const styles = useSectionHeaderStyles();
  return <Text style={styles.sectionHeader}>{props.label}</Text>;
}
