import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDataTableRowStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    evenRow: {
      backgroundColor: styles.color.field,
    },
    oddRow: {},
    evenCell: {
      backgroundColor: styles.color.secondaryField,
    },
    oddCell: {},
    cell: {
      padding: styles.layout.smallSpace,
    },
    borderHandle: {
      width: 4,
      backgroundColor: styles.color.background,
    },
    activeBorderHandle: {
      width: 4,
      backgroundColor: styles.color.primary,
      cursor: 'col-resize',
    },
  });
}
