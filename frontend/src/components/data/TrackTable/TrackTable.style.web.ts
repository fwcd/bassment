import { useStyles } from '@bassment/styles';

export function useTrackTableStyles() {
  const styles = useStyles();
  return {
    wrapper: {
      height: '100%',
      overflow: 'auto',
      padding: 0,
    },
    table: {
      width: '100%',
      color: styles.text.color,
      fontSize: styles.text.fontSize,
      borderSpacing: '0px',
    },
    head: {
      position: 'sticky',
      top: '0',
      padding: styles.layout.space,
      backgroundColor: 'red',
    },
    cell: {
      padding: `0 ${styles.layout.smallSpace}px`,
    },
  } as const;
}
