import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDataTableCellStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    evenCell: {
      backgroundColor: styles.color.secondaryField,
    },
    oddCell: {},
    cell: {
      flexDirection: 'row',
      padding: styles.layout.smallSpace,
    },
    borderHandle: {
      width: 4,
      cursor: 'col-resize',
    },
  });
}
