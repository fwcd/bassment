import { useTheme } from '@react-navigation/native';

export function useColorStyles() {
  const theme = useTheme();
  return {
    primary: theme.colors.primary,
    foreground: theme.colors.text,
    background: theme.colors.background,
    subscript: theme.dark ? '#777777' : '#666666',
    card: theme.colors.card,
    border: theme.colors.border,
    field: theme.dark ? '#292929' : '#e8e8e8',
    secondaryField: theme.dark ? '#191919' : '#eeeeee',
    selection: `rgba(255, 200, 115, ${theme.dark ? '0.2' : '0.5'})`,
    hover: `rgba(255, 200, 115, ${theme.dark ? '0.1' : '0.3'})`,
    translucentZone: theme.dark
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(255, 255, 255, 0.8)',
  };
}
