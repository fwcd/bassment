import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useAppHeaderStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    header: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: styles.layout.space,
      marginHorizontal: styles.layout.smallSpace,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: styles.text.largeFontSize,
      fontWeight: 'bold',
    },
  });
}
