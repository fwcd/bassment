import { StyleSheet } from 'react-native';
import {
  margin,
  padding,
  smallMargin,
  smallPadding,
} from '@bassment/styles/layout';
import { useBackgroundStyles, useBorderStyles } from '@bassment/styles/color';
import { useLabelStyles } from '@bassment/styles/text';

export function useStyles() {
  return StyleSheet.create({
    // Layout
    padding,
    margin,
    smallPadding,
    smallMargin,
    // Color
    background: useBackgroundStyles(),
    border: useBorderStyles(),
    // Text
    label: useLabelStyles(),
  });
}
