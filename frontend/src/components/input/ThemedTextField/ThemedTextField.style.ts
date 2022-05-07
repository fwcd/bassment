import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useThemedTextFieldStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    textField: {
      borderRadius: styles.layout.borderRadius,
      padding: styles.layout.smallSpace,
      backgroundColor: styles.color.field,
      fontSize: styles.text.fontSize,
      color: styles.text.color,
    },
  });
}
