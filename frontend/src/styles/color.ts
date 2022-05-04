import { useTheme } from '@react-navigation/native';
import { ViewStyle } from 'react-native';

export function useBackgroundStyles(): ViewStyle {
  const theme = useTheme();
  return {
    backgroundColor: theme.colors.background,
  };
}

export function useBorderStyles(): ViewStyle {
  const theme = useTheme();
  return {
    borderColor: theme.colors.border,
  };
}
