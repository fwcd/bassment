import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useSectionButtonStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    icon: {
      color: styles.color.subscript,
    },
  });
}
