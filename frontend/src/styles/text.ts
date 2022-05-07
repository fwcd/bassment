import { useTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

export function useTextStyles() {
  const theme = useTheme();
  return {
    fontSize: Platform.OS === 'web' ? 13 : 16,
    color: theme.colors.text,
  };
}
