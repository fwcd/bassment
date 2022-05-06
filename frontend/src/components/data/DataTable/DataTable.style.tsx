import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDataTableStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    table: {},
    row: {
      flex: 1,
      flexDirection: 'row',
      padding: styles.layout.smallSpace,
    },
    even: {
      backgroundColor: styles.color.field,
    },
    odd: {},
    cell: {},
  });
}
