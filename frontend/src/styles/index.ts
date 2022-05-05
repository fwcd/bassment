import { useColorStyles } from '@bassment/styles/color';
import { useIconStyles } from '@bassment/styles/icon';
import { useLayoutStyles } from '@bassment/styles/layout';
import { useTextStyles } from '@bassment/styles/text';

export function useStyles() {
  return {
    color: useColorStyles(),
    layout: useLayoutStyles(),
    text: useTextStyles(),
    icon: useIconStyles(),
  };
}
