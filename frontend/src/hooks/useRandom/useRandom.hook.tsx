import { RandomContext } from '@bassment/contexts/random';
import { useContext } from 'react';

/**
 * Hook for accessing RandomContext.
 */
export const useRandom = () => useContext(RandomContext);
