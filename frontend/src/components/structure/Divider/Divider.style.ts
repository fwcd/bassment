import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDividerStyles(vertical: boolean) {
  const styles = useStyles();
  const width = 1;
  return StyleSheet.create({
    divider: {
      borderColor: styles.color.border,
      ...(vertical
        ? { borderRightWidth: width }
        : { borderBottomWidth: width }),
    },
  });
}
