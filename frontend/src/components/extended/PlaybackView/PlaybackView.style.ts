import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function usePlaybackViewStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    view: {
      width: '100%',
      height: '100%',
      padding: styles.layout.space,
      backgroundColor: styles.color.secondaryField,
    },
  });
}
