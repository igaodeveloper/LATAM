import { supabase, handleSupabaseError, SupabaseResponse } from '../lib/supabase';
import { User, AuthError, AuthChangeEvent } from '@supabase/supabase-js';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends AuthCredentials {
  name: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

class AuthService {
  async signUp({ email, password, name }: SignUpCredentials): Promise<SupabaseResponse<User>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;
      return { data: data.user, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async signIn({ email, password }: AuthCredentials): Promise<SupabaseResponse<User>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data: data.user, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async signOut(): Promise<SupabaseResponse<void>> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { data: null, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async resetPassword(email: string): Promise<SupabaseResponse<void>> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { data: null, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async updatePassword(newPassword: string): Promise<SupabaseResponse<void>> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      return { data: null, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async getCurrentUser(): Promise<SupabaseResponse<User>> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { data: user, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async updateProfile(updates: { name?: string; avatar_url?: string }): Promise<SupabaseResponse<User>> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      });
      if (error) throw error;
      return { data: data.user, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  subscribeToAuthChanges(callback: (event: AuthChangeEvent, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService(); 