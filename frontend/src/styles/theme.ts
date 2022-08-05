import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export function useDerivedTheme() {
  const scheme = useColorScheme();
  const baseTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: '#ffddab',
    },
  };
}
