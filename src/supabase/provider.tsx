'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './client';

export interface SupabaseContextState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  supabase: typeof supabase; // [ADDED] Explicit type for the client instance
}

export const SupabaseContext = React.createContext<SupabaseContextState | undefined>(undefined);

interface SupabaseProviderProps {
  children: ReactNode;
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const contextValue: SupabaseContextState = {
    session,
    user,
    isLoading,
    isAuthenticated: !!user,
    supabase, // [ADDED] Exposing the initialized client instance to the context tree
  };

  return (
    <SupabaseContext.Provider value={contextValue}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase(): SupabaseContextState {
  const context = React.useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}

// [UPDATED] Formatted to exactly match the destructuring in your AdminPage component
export function useUser() {
  const { user, isLoading, supabase } = useSupabase();
  return { 
    user, 
    isUserLoading: isLoading, // Maps internal isLoading to admin page's isUserLoading
    supabase 
  };
}

export function useSession() {
  const { session, isLoading, supabase } = useSupabase();
  return { session, isLoading, supabase };
}