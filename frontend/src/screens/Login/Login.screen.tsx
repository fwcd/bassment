import { ThemedText } from '@bassment/components/display/ThemedText';
import { ThemedButton } from '@bassment/components/input/ThemedButton';
import { ThemedTextField } from '@bassment/components/input/ThemedTextField';
import { AuthContext } from '@bassment/contexts/Auth';
import { useLoginStyles } from '@bassment/screens/Login/Login.style';
import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';

export function LoginScreen() {
  const styles = useLoginStyles();
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useCallback(() => {
    auth.logIn(username, password);
  }, [auth, username, password]);

  return (
    <View style={styles.login}>
      <ThemedText style={[styles.title, styles.item]}>Bassment</ThemedText>
      <View style={styles.item}>
        <View style={styles.subItem}>
          <ThemedTextField
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.subItem}>
          <ThemedTextField
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={signIn}
          />
        </View>
      </View>
      <View style={styles.item}>
        <ThemedButton onPress={signIn}>Sign in</ThemedButton>
      </View>
    </View>
  );
}
