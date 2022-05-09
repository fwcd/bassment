import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useAppHeaderStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: styles.layout.space,
      marginHorizontal: styles.layout.smallSpace,
    },
    item: {
      flex: 1,
      flexDirection: 'row',
    },
    playback: {
      alignItems: 'center',
    },
    title: {
      textAlign: 'right',
      fontSize: styles.text.subtitleFontSize,
      fontWeight: 'bold',
    },
  });
}
