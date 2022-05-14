export function useTrackTableStyles() {
  return {
    grid: {
      height: '100%',
    },
    patched: `
      .rdg-cell {
        border: none;
      }

      .rdg-cell[aria-selected='true'] {
        outline: none;
      }
    `,
  };
}
