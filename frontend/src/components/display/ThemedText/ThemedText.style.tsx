import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useThemedTextStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    themedText: {
      color: styles.text.color,
    },
  });
}
