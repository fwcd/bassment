import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useAppHeaderStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: styles.layout.smallSpace,
      height: 50,
    },
    item: {
      flex: 2,
      flexDirection: 'row',
    },
    sideItem: {
      padding: styles.layout.space,
    },
    playback: {
      flex: 3,
      alignItems: 'center',
    },
    title: {
      textAlign: 'right',
      fontSize: styles.text.subtitleFontSize,
      fontWeight: 'bold',
    },
  });
}
