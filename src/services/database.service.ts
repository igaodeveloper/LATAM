import { supabase, handleSupabaseError, SupabaseResponse } from '../lib/supabase';
import {
  Profile,
  Project,
  Experience,
  Education,
  Skill,
  Contact,
} from '../types/database';

class DatabaseService {
  // Profile operations
  async getProfile(userId: string): Promise<SupabaseResponse<Profile>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async updateProfile(profile: Partial<Profile>): Promise<SupabaseResponse<Profile>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('user_id', profile.user_id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  // Project operations
  async getProjects(userId: string): Promise<SupabaseResponse<Project[]>> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<SupabaseResponse<Project>> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async updateProject(project: Partial<Project>): Promise<SupabaseResponse<Project>> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', project.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async deleteProject(projectId: string): Promise<SupabaseResponse<void>> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      return { data: null, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  // Experience operations
  async getExperiences(userId: string): Promise<SupabaseResponse<Experience[]>> {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('user_id', userId)
        .order('start_date', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async createExperience(experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>): Promise<SupabaseResponse<Experience>> {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .insert([experience])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  // Education operations
  async getEducation(userId: string): Promise<SupabaseResponse<Education[]>> {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('user_id', userId)
        .order('start_date', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async createEducation(education: Omit<Education, 'id' | 'created_at' | 'updated_at'>): Promise<SupabaseResponse<Education>> {
    try {
      const { data, error } = await supabase
        .from('education')
        .insert([education])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  // Skills operations
  async getSkills(userId: string): Promise<SupabaseResponse<Skill[]>> {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', userId)
        .order('category', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>): Promise<SupabaseResponse<Skill>> {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([skill])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  // Contact operations
  async getContact(userId: string): Promise<SupabaseResponse<Contact>> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async updateContact(contact: Partial<Contact>): Promise<SupabaseResponse<Contact>> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update(contact)
        .eq('user_id', contact.user_id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }
}

export const databaseService = new DatabaseService(); 