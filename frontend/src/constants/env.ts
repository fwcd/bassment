import { Platform } from 'react-native';

export const envConstants = {
  isDev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  platform: {
    os: Platform.OS,
    version: Platform.Version,
  },
};
