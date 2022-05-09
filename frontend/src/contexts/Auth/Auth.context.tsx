import { networkConstants } from '@bassment/constants';
import { AuthTokenResponse } from '@bassment/contexts/Auth/Auth.protocol';
import React, { createContext, ReactNode, useCallback, useState } from 'react';

interface AuthContextState {
  serverUrl: string;
  token?: string;
}

export interface AuthContextValue {
  /** The Bassment server URL (or path prefix, e.g. if the same origin is used). */
  readonly serverUrl: string;
  /** The API access token. */
  readonly token?: string;

  /** Logs into the Bassment server with the given credentials. */
  logIn(username: string, password: string): Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue>({
  serverUrl: networkConstants.defaultServerUrl,

  async logIn(): Promise<void> {
    console.warn('No auth context available, not logging in!');
  },
});

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [state, setState] = useState<AuthContextState>({
    // TODO: Make this customizable
    serverUrl: networkConstants.defaultServerUrl,
  });

  const authRequest = useCallback(
    async (method: string, endpoint: string, body: any) => {
      const response = await fetch(`${state.serverUrl}/auth/v1${endpoint}`, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': networkConstants.userAgent,
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw Error(
          `Auth request failed with status ${response.status} ${response.statusText}`,
        );
      }
      return await response.json();
    },
    [state.serverUrl],
  );

  const value: AuthContextValue = {
    serverUrl: state.serverUrl,
    token: state.token,

    async logIn(username: string, password: string): Promise<void> {
      const response: AuthTokenResponse = await authRequest('POST', '/login', {
        username,
        password,
      });
      setState({ ...state, token: response.token });
    },
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
