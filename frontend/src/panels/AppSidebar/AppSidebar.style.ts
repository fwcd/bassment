import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useAppSidebarStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    sidebar: {
      marginHorizontal: styles.layout.smallSpace,
    },
  });
}
