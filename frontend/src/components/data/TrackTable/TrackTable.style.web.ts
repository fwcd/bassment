import { useStyles } from '@bassment/styles';

export function useTrackTableStyles() {
  const styles = useStyles();
  return `
    .tt-wrapper {
      height: 100%;
      overflow: auto;
      padding: 0;
    }

    .tt-table {
      width: 100%;
      color: ${styles.color.foreground};
      font-size: ${styles.text.fontSize}px;
      border-spacing: 0;
    }

    .tt-head {
      position: sticky;
      top: 0;
      text-align: left;
      background-color: ${styles.color.field};
    }

    .tt-unselected:hover {
      background-color: ${styles.color.hover};
    }

    .tt-selected {
      background-color: ${styles.color.selection};
    }

    .tt-head-cell {
      padding: ${styles.layout.smallSpace};
    }

    .tt-cell {
      padding: ${styles.layout.tinySpace}px ${styles.layout.space}px;
    }
  `;
}
