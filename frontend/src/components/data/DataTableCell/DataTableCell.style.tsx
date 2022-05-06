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
      padding: styles.layout.smallSpace,
    },
    borderHandle: {
      width: 4,
      backgroundColor: styles.color.background,
      cursor: 'col-resize',
    },
  });
}
