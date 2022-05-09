import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDataTableRowStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    headerRow: {
      backgroundColor: styles.color.field,
    },
    evenRow: {
      backgroundColor: styles.color.secondaryField,
    },
    selectedRow: {
      backgroundColor: styles.color.selection,
    },
    oddRow: {},
  });
}
