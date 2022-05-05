import { useTheme } from '@react-navigation/native';

export function useTextStyles() {
  const theme = useTheme();
  return {
    fontSize: 14,
    color: theme.colors.text,
  };
}
