import { envConstants } from '@bassment/constants/env';
import { useTheme } from '@react-navigation/native';

export function useTextStyles() {
  const theme = useTheme();
  // TODO: Deal with platforms like 'macos' and 'windows' once/if we support them
  const scale = envConstants.platform.os === 'web' ? 1 : 1.3;
  return {
    headerSize: 26 * scale,
    fontSize: 13 * scale,
    largeFontSize: 22 * scale,
    color: theme.colors.text,
  };
}
