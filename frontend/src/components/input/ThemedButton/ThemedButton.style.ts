import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useThemedButtonStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    button: {
      borderRadius: styles.layout.borderRadius,
      backgroundColor: styles.color.selection,
      paddingVertical: styles.layout.smallSpace,
      paddingHorizontal: styles.layout.space,
    },
    pressed: {
      opacity: 0.5,
    },
  });
}
