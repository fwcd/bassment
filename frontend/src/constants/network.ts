import { envConstants } from '@bassment/constants/env';

export const networkConstants = {
  defaultServerUrl: envConstants.isDev ? 'http://localhost:8090' : '/',
  userAgent: `BassmentFrontend/0.0.1 (${envConstants.platform.os}, ${envConstants.platform.version})`,
};
