import { envConstants } from '@bassment/constants/env';

export function useTextStyles() {
  // TODO: Deal with platforms like 'macos' and 'windows' once/if we support them
  const scale = envConstants.platform.os === 'web' ? 1 : 1.3;
  return {
    headerSize: 26 * scale,
    fontSize: 13 * scale,
    titleFontSize: 22 * scale,
    subtitleFontSize: 18 * scale,
    labelFontSize: 10 * scale,
  };
}
