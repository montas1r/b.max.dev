'use client';

import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../client';

export interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: PostgrestError | Error | null;
}

/**
 * Hook to fetch a single record from Supabase (equivalent to Firebase useDoc)
 * @param table - Table name
 * @param column - Column to filter by
 * @param value - Value to match
 * @returns { data, isLoading, error }
 */
export function useQuery<T = any>(
  table: string | null | undefined,
  column: string | null | undefined,
  value: string | null | undefined
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | Error | null>(null);

  useEffect(() => {
    if (!table || !column || value === null || value === undefined) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const { data: result, error: err } = await supabase
          .from(table)
          .select('*')
          .eq(column, value)
          .single();

        if (err) throw err;
        setData(result as T);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [table, column, value]);

  return { data, isLoading, error };
}

/**
 * Hook to fetch multiple records from Supabase (equivalent to Firebase useCollection)
 * @param table - Table name
 * @param filters - Optional filters { column: value }
 * @param orderBy - Optional sort { column: 'asc' | 'desc' }
 * @returns { data, isLoading, error }
 */
export function useTable<T = any>(
  table: string | null | undefined,
  filters?: Record<string, any>,
  orderBy?: { column: string; ascending?: boolean }
): UseQueryResult<T[]> {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | Error | null>(null);

  useEffect(() => {
    if (!table) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        let query = supabase.from(table).select('*');

        // Apply filters
        if (filters) {
          for (const [key, value] of Object.entries(filters)) {
            query = query.eq(key, value);
          }
        }

        // Apply ordering
        if (orderBy) {
          query = query.order(orderBy.column, {
            ascending: orderBy.ascending !== false,
          });
        }

        const { data: result, error: err } = await query;

        if (err) throw err;
        setData(result as T[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [table, JSON.stringify(filters), orderBy?.column, orderBy?.ascending]);

  return { data, isLoading, error };
}
