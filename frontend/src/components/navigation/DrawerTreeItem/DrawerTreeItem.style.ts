import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDrawerTreeItemStyles(focused: boolean, isButton: boolean) {
  const styles = useStyles();
  return StyleSheet.create({
    item: {
      flexDirection: 'row',
      padding: styles.layout.smallSpace,
      margin: styles.layout.tinySpace,
      backgroundColor: focused
        ? styles.color.selection
        : isButton
        ? styles.color.field
        : 'transparent',
      borderRadius: styles.layout.borderRadius,
    },
    icons: {
      flexDirection: 'row',
      width: 2.5 * styles.icon.size,
      paddingEnd: styles.layout.smallSpace,
    },
    label: {
      fontSize: styles.text.fontSize,
      color: styles.text.color,
    },
    chevron: {
      width: styles.icon.size,
      paddingEnd: styles.layout.largeSpace,
    },
  });
}
