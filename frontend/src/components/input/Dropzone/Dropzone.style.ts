import { useStyles } from '@bassment/styles';
import { StyleSheet } from 'react-native';

export function useDropzoneStyles() {
  const styles = useStyles();
  return StyleSheet.create({
    stretch: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      borderColor: styles.color.primary,
      borderStyle: 'dashed',
      backgroundColor: styles.color.translucentZone,
      borderWidth: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: styles.text.subtitleFontSize,
    },
  });
}
