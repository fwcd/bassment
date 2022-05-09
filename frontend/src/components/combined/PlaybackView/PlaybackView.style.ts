import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function usePlaybackViewStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    view: {
      width: '100%',
      height: '100%',
      backgroundColor: styles.color.secondaryField,
    },
    coverArt: {
      height: '100%',
    },
    playback: {
      flexGrow: 1,
      flexDirection: 'column',
    },
    info: {
      padding: styles.layout.space,
    },
  });
}
