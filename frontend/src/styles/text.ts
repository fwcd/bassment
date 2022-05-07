import { useTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

export function useTextStyles() {
  const theme = useTheme();
  const scale = Platform.OS === 'web' ? 1 : 1.2;
  return {
    headerSize: 26 * scale,
    fontSize: 13 * scale,
    color: theme.colors.text,
  };
}
