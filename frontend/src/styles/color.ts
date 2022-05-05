import { useTheme } from '@react-navigation/native';

export function useColorStyles() {
  const theme = useTheme();
  return {
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.card,
    border: theme.colors.border,
  };
}
