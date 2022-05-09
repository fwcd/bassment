import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useAppHeaderStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    header: {
      padding: styles.layout.largeSpace,
      marginHorizontal: styles.layout.smallSpace,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
}
