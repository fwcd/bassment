import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useSectionHeaderStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      fontSize: styles.text.labelFontSize,
      color: styles.color.subscript,
      textTransform: 'uppercase',
      padding: styles.layout.space,
      flex: 1,
    },
  });
}
