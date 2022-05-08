import React, { createContext, ReactNode, useState } from 'react';

export interface SearchContextValue {
  readonly searchText: string;

  setSearchText(searchText: string): void;
}

export const SearchContext = createContext<SearchContextValue>({
  searchText: '',
  setSearchText: () => {},
});

interface SearchContextProviderProps {
  children: ReactNode;
}

export function SearchContextProvider(props: SearchContextProviderProps) {
  const [searchText, setSearchText] = useState('');

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {props.children}
    </SearchContext.Provider>
  );
}
