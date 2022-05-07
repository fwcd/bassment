import { useTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

export function useTextStyles() {
  const theme = useTheme();
  // TODO: Deal with platforms like 'macos' and 'windows' once/if we support them
  const scale = Platform.OS === 'web' ? 1 : 1.3;
  return {
    headerSize: 26 * scale,
    fontSize: 13 * scale,
    color: theme.colors.text,
  };
}
