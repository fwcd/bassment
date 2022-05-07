import { ThemedText } from '@bassment/components/display/ThemedText';
import { ThemedTextField } from '@bassment/components/input/ThemedTextField';
import { useLoginStyles } from '@bassment/screens/Login/Login.style';
import React from 'react';
import { View } from 'react-native';

export function LoginScreen() {
  const styles = useLoginStyles();
  return (
    <View style={styles.login}>
      <ThemedText style={[styles.title, styles.item]}>Bassment</ThemedText>
      <View style={styles.item}>
        <View style={styles.subItem}>
          <ThemedTextField placeholder="Username" />
        </View>
        <View style={styles.subItem}>
          <ThemedTextField placeholder="Password" secureTextEntry />
        </View>
      </View>
    </View>
  );
}
