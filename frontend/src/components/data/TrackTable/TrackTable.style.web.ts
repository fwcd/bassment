import { useStyles } from '@bassment/styles';

export function useTrackTableStyles() {
  const styles = useStyles();
  return {
    grid: {
      height: '100%',
    },
    patched: `
      .rdg-row {
        --rdg-row-hover-background-color: ${styles.color.hover};
        --rdg-row-selected-background-color: ${styles.color.selection};
        --row-selected-hover-background-color: ${styles.color.selection};
        --rdg-selection-color: ${styles.color.selection};
      }

      .rdg-cell {
        border: none;
      }

      .rdg-cell[aria-selected='true'] {
        outline: none;
      }

      .selected-track {
        background-color: ${styles.color.selection};
      }
    `,
  };
}
