import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDrawerTreeItemStyles(focused: boolean) {
  const styles = useStyles();
  return StyleSheet.create({
    item: {
      flex: 1,
      flexDirection: 'row',
      padding: styles.layout.smallSpace,
      margin: styles.layout.tinySpace,
      backgroundColor: focused ? styles.color.selection : 'transparent',
      borderRadius: styles.layout.borderRadius,
    },
    icons: {
      flexDirection: 'row',
      paddingEnd: styles.layout.smallSpace,
    },
    label: {
      fontSize: styles.text.fontSize,
      color: styles.text.color,
    },
    chevron: {
      width: styles.icon.size,
      paddingEnd: styles.layout.smallSpace,
    },
  });
}
