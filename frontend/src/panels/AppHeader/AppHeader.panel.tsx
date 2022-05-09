import React from 'react';
import { ThemedText } from '@bassment/components/display/ThemedText';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import { useStyles } from '@bassment/styles';

export function AppHeader(props: DrawerHeaderProps) {
  const globalStyles = useStyles();
  const styles = StyleSheet.create({
    header: {
      padding: globalStyles.layout.largeSpace,
      marginHorizontal: globalStyles.layout.smallSpace,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.header}>
      <ThemedText style={styles.title}>
        {props.options.headerTitle ?? props.options.title ?? props.route.name}
      </ThemedText>
    </View>
  );
}
