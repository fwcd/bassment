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
  const [failed, setFailed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useCallback(async () => {
    try {
      await auth.logIn(username, password);
    } catch {
      setFailed(true);
    }
  }, [auth, username, password]);

  // TODO: Add KeyboardAvoidingView to make this look at bit nicer on mobile

  return (
    <View style={styles.login}>
      <ThemedText style={[styles.title, styles.item]}>Bassment</ThemedText>
      {failed ? (
        <ThemedText style={[styles.item, styles.failed]}>
          Login failed!
        </ThemedText>
      ) : null}
      <View style={styles.item}>
        <View style={styles.subItem}>
          <ThemedTextField
            placeholder="Username"
            autoCapitalize="none"
            autoComplete="username"
            value={username}
            onChangeText={setUsername}
            style={styles.field}
          />
        </View>
        <View style={styles.subItem}>
          <ThemedTextField
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={signIn}
            style={styles.field}
          />
        </View>
      </View>
      <View style={styles.item}>
        <ThemedButton onPress={signIn}>Sign in</ThemedButton>
      </View>
    </View>
  );
}
