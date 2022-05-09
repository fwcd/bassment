import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function usePlaybackControlsStyles() {
  const styles = useStyles();

  return StyleSheet.create({
    controls: {
      flexDirection: 'row',
    },
  });
}
