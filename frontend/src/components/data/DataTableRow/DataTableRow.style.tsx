import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDataTableRowStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    headerRow: {
      backgroundColor: styles.color.field,
    },
    evenRow: {
      backgroundColor: styles.color.secondaryField,
    },
    oddRow: {},
  });
}
