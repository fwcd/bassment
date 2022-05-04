import { RandomContextType } from '@bassment/api/RandomContext';
import React, { createContext, PropsWithChildren } from 'react';

export const RandomContext = createContext<RandomContextType>({ value: 0 });

// usually you do not need props for a provider
type RandomContextProviderProps = unknown;

/**
 * Provider for RandomContext.
 */
export function RandomContextProvider({
  children,
}: PropsWithChildren<RandomContextProviderProps>) {
  const randomValue = Math.random();

  return (
    <RandomContext.Provider value={{ value: randomValue }}>
      {children}
    </RandomContext.Provider>
  );
}
