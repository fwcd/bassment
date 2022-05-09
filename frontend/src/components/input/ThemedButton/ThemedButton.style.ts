import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useThemedButtonStyles(hasBackground: boolean) {
  const styles = useStyles();
  return StyleSheet.create({
    button: {
      borderRadius: styles.layout.borderRadius,
      backgroundColor: hasBackground ? styles.color.selection : undefined,
      paddingVertical: styles.layout.smallSpace,
      paddingHorizontal: styles.layout.space,
    },
    pressed: {
      opacity: 0.5,
    },
  });
}
