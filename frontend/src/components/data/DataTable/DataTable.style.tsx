import { StyleSheet } from 'react-native';

export function useDataTableStyles() {
  return StyleSheet.create({
    table: {},
    pressable: {
      cursor: 'unset',
    } as any,
  });
}
