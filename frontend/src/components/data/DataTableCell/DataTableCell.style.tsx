import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDataTableCellStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    cell: {
      flexDirection: 'row',
      padding: styles.layout.smallSpace,
    },
    borderHandle: {
      width: 4,
      cursor: 'col-resize',
    } as any,
    headerText: {
      fontWeight: 'bold',
    },
  });
}
