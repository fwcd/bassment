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
      borderSpacing: '0',
    },
    head: {
      position: 'sticky',
      top: '0',
      textAlign: 'left',
      backgroundColor: styles.color.field,
    },
    headCell: {
      padding: styles.layout.smallSpace,
    },
    cell: {
      padding: `${styles.layout.tinySpace}px ${styles.layout.space}px`,
    },
  } as const;
}
