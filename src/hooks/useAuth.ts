import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
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
      try {
        const { data: user, error: userError } = await authService.getCurrentUser();
        
        if (userError) throw userError;

        if (user) {
          const { data: profile, error: profileError } = await databaseService.getProfile(user.id);
          
          if (profileError) throw profileError;

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
        const { data: profile, error: profileError } = await databaseService.getProfile(session.user.id);
        
        if (profileError) {
          setState({
            user: session.user,
            profile: null,
            loading: false,
            error: profileError,
          });
        } else {
          setState({
            user: session.user,
            profile,
            loading: false,
            error: null,
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
    if (!state.user) throw new Error('No user logged in');
    
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { data: profile, error } = await databaseService.updateProfile({
        ...updates,
        user_id: state.user.id,
      });
      
      if (error) throw error;
      
      setState((prev) => ({
        ...prev,
        profile,
        loading: false,
        error: null,
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