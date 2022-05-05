import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDrawerTreeItemStyles(focused: boolean) {
  const styles = useStyles();
  return StyleSheet.create({
    item: {
      flex: 1,
      flexDirection: 'row',
      margin: styles.layout.smallSpace,
    },
    icons: {
      flexDirection: 'row',
      paddingEnd: styles.layout.space,
    },
    label: {
      fontSize: styles.text.fontSize,
      color: styles.text.color,
    },
    chevron: {
      width: 25,
      paddingEnd: 15,
    },
  });
}
