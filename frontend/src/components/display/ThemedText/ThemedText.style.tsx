import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useThemedTextStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    themedText: {
      fontSize: styles.text.fontSize,
      color: styles.color.foreground,
    },
  });
}
