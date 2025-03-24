import { supabase, handleSupabaseError, SupabaseResponse } from '../lib/supabase';
import type { Profile, Project, Experience, Education, Skill, Contact } from "@/types/profile";
import type { Database } from "@/types/supabase";

type Tables = Database["public"]["Tables"];

export class DatabaseService {
  // Profile operations
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data as Profile;
  }

  async updateProfile(userId: string, profile: Partial<Profile>): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      return null;
    }

    return data as Profile;
  }

  // Project operations
  async getProjects(userId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return data as Project[];
  }

  async createProject(project: Omit<Project, "id" | "created_at" | "updated_at">): Promise<Project | null> {
    const { data, error } = await supabase
      .from("projects")
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error("Error creating project:", error);
      return null;
    }

    return data as Project;
  }

  async updateProject(projectId: string, project: Partial<Project>): Promise<Project | null> {
    const { data, error } = await supabase
      .from("projects")
      .update(project)
      .eq("id", projectId)
      .select()
      .single();

    if (error) {
      console.error("Error updating project:", error);
      return null;
    }

    return data as Project;
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
  async getExperiences(userId: string): Promise<Experience[]> {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching experiences:", error);
      return [];
    }

    return data as Experience[];
  }

  async createExperience(experience: Omit<Experience, "id" | "created_at" | "updated_at">): Promise<Experience | null> {
    const { data, error } = await supabase
      .from("experiences")
      .insert([experience])
      .select()
      .single();

    if (error) {
      console.error("Error creating experience:", error);
      return null;
    }

    return data as Experience;
  }

  // Education operations
  async getEducation(userId: string): Promise<Education[]> {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching education:", error);
      return [];
    }

    return data as Education[];
  }

  async createEducation(education: Omit<Education, "id" | "created_at" | "updated_at">): Promise<Education | null> {
    const { data, error } = await supabase
      .from("education")
      .insert([education])
      .select()
      .single();

    if (error) {
      console.error("Error creating education:", error);
      return null;
    }

    return data as Education;
  }

  // Skills operations
  async getSkills(userId: string): Promise<Skill[]> {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching skills:", error);
      return [];
    }

    return data as Skill[];
  }

  async createSkill(skill: Omit<Skill, "id" | "created_at" | "updated_at">): Promise<Skill | null> {
    const { data, error } = await supabase
      .from("skills")
      .insert([skill])
      .select()
      .single();

    if (error) {
      console.error("Error creating skill:", error);
      return null;
    }

    return data as Skill;
  }

  // Contact operations
  async getContact(userId: string): Promise<Contact | null> {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching contact:", error);
      return null;
    }

    return data as Contact;
  }

  async updateContact(userId: string, contact: Partial<Contact>): Promise<Contact | null> {
    const { data, error } = await supabase
      .from("contacts")
      .update(contact)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating contact:", error);
      return null;
    }

    return data as Contact;
  }
}

export const databaseService = new DatabaseService(); 