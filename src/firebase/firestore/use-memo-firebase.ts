
'use client';

import { useMemo } from 'react';

/**
 * A custom hook to memoize Firebase references or queries.
 * This ensures that the reference remains stable across renders unless 
 * its dependencies change, preventing infinite loops in Firestore hooks.
 */
export function useMemoFirebase<T>(factory: () => T, deps: React.DependencyList): T {
  return useMemo(factory, deps);
}
