import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function usePlaybackProgressStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    slider: {
      width: '100%',
      height: 20,
      margin: 0,
    },
  });
}
