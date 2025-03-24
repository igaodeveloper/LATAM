import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService } from '../services/auth.service';
import { databaseService } from '../services/database.service';
import { Profile } from '../types/database';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setState(prev => ({ ...prev, loading: true }));
      try {
        const { data: user, error: userError } = await authService.getCurrentUser();
        
        if (userError) throw userError;

        if (user) {
          const profile = await databaseService.getProfile(user.id);
          
          setState({
            user,
            profile,
            loading: false,
            error: null,
          });
        } else {
          setState({
            user: null,
            profile: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setState({
          user: null,
          profile: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = authService.subscribeToAuthChanges(async (event, session) => {
      if (session?.user) {
        try {
          const profile = await databaseService.getProfile(session.user.id);
          
          setState({
            user: session.user,
            profile,
            loading: false,
            error: null,
          });
        } catch (error) {
          setState({
            user: session.user,
            profile: null,
            loading: false,
            error: error instanceof Error ? error.message : 'An error occurred',
          });
        }
      } else {
        setState({
          user: null,
          profile: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { data: user, error } = await authService.signIn({ email, password });
      if (error) throw error;
      return user;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { data: user, error } = await authService.signUp({ email, password, name });
      if (error) throw error;
      return user;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
      throw error;
    }
  };

  const signOut = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { error } = await authService.signOut();
      if (error) throw error;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!state.user) {
      throw new Error("Cannot update profile: no user logged in");
    }
    
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const profile = await databaseService.updateProfile(state.user.id, updates);
      
      if (!profile) throw new Error("Failed to update profile");
      
      setState((prev) => ({
        ...prev,
        profile,
        loading: false,
      }));
      
      return profile;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
      throw error;
    }
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
} 