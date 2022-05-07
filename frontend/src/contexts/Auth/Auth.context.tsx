import React, { createContext, ReactNode, useState } from 'react';

interface AuthContextState {
  token?: string;
}

interface AuthContextValue {
  token?: string;

  logIn(username: string, password: string): Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue>({
  async logIn(): Promise<void> {
    console.warn('No auth context available, not logging in!');
  },
});

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [state, setState] = useState<AuthContextState>({});

  const value: AuthContextValue = {
    get token() {
      return state.token;
    },

    async logIn(username: string, password: string): Promise<void> {
      // TODO
    },
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
