import { useTheme } from '@react-navigation/native';

export function useIconStyles() {
  const theme = useTheme();
  return {
    color: theme.dark ? 'white' : 'black',
    size: 16,
    largeSize: 26,
  };
}
