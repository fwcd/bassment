import { useDividerStyles } from '@bassment/components/structure/Divider/Divider.style';
import React from 'react';
import { View } from 'react-native';

interface DividerProps {
  vertical?: boolean;
}

// TODO: Maybe move this to another folder, since this is a concrete implementation/extension
export function Divider(props: DividerProps) {
  const styles = useDividerStyles(props.vertical ?? false);

  return <View style={styles.divider} />;
}
