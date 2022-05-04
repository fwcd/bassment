import { useTheme } from '@react-navigation/native';
import { TextStyle } from 'react-native';

const textSize = 14;

export function useLabelStyles(): TextStyle {
  const theme = useTheme();
  return {
    fontSize: textSize,
    color: theme.colors.text,
  };
}
