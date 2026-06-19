'use client';

import { supabase } from '../client';

/**
 * Insert a single record
 */
export async function insertRecord<T>(table: string, data: T) {
  const { data: result, error } = await supabase
    .from(table)
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
}

/**
 * Insert multiple records
 */
export async function insertRecords<T>(table: string, data: T[]) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();

  if (error) throw error;
  return result;
}

/**
 * Update a record by ID
 */
export async function updateRecord<T>(
  table: string,
  id: string,
  data: Partial<T>
) {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

/**
 * Update multiple records with filter
 */
export async function updateRecords<T>(
  table: string,
  filters: Record<string, any>,
  data: Partial<T>
) {
  let query = supabase.from(table).update(data);

  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }

  const { data: result, error } = await query.select();

  if (error) throw error;
  return result;
}

/**
 * Delete a record by ID
 */
export async function deleteRecord(table: string, id: string) {
  const { error } = await supabase.from(table).delete().eq('id', id);

  if (error) throw error;
}

/**
 * Delete multiple records with filter
 */
export async function deleteRecords(
  table: string,
  filters: Record<string, any>
) {
  let query = supabase.from(table).delete();

  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }

  const { error } = await query;

  if (error) throw error;
}

/**
 * Get a single record by ID
 */
export async function getRecordById<T>(table: string, id: string) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as T;
}

/**
 * Get all records from a table
 */
export async function getAllRecords<T>(table: string) {
  const { data, error } = await supabase.from(table).select('*');

  if (error) throw error;
  return data as T[];
}

/**
 * Get records with filters
 */
export async function getRecords<T>(
  table: string,
  filters: Record<string, any>
) {
  let query = supabase.from(table).select('*');

  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as T[];
}
