import { StyleSheet } from 'react-native';

export function useDropzoneStyles() {
  return StyleSheet.create({
    overlay: {
      position: 'absolute',
      zIndex: 1,
    },
  });
}
