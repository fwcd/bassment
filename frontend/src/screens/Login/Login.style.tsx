import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useLoginStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    login: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      marginVertical: styles.layout.smallSpace,
    },
    failed: {
      paddingVertical: styles.layout.smallSpace,
      paddingHorizontal: styles.layout.space,
      backgroundColor: 'rgba(255, 69, 56, 0.2)',
    },
    subItem: {
      marginVertical: styles.layout.smallSpace,
    },
    title: {
      fontSize: styles.text.headerSize,
    },
  });
}
