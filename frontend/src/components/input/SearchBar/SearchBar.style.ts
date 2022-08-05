import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useSearchBarStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    searchBar: {
      marginVertical: styles.layout.space,
      marginHorizontal: styles.layout.tinySpace,
      borderRadius: styles.layout.borderRadius,
      padding: styles.layout.smallSpace,
      backgroundColor: styles.color.field,
      fontSize: styles.text.fontSize,
      color: styles.color.foreground,
    },
  });
}
