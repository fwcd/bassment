import { useTextStyles } from '@bassment/styles/text';
import { useTheme } from '@react-navigation/native';

export function useIconStyles() {
  const theme = useTheme();
  const textStyles = useTextStyles();
  return {
    color: theme.dark ? 'white' : 'black',
    size: textStyles.fontSize,
  };
}
