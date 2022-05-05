import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useSearchBarStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    searchBar: {
      margin: styles.layout.space,
      padding: styles.layout.smallSpace,
      backgroundColor: styles.color.background,
      fontSize: styles.text.fontSize,
      color: styles.text.color,
    },
  });
}
