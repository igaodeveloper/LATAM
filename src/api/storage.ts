import { supabase } from "@/lib/supabase";

export const storage = {
  /**
   * Upload a file to a bucket
   */
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });
    if (error) throw error;
    return data;
  },

  /**
   * Download a file from a bucket
   */
  async downloadFile(bucket: string, path: string) {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    if (error) throw error;
    return data;
  },

  /**
   * Get a public URL for a file
   */
  getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  /**
   * List all files in a bucket
   */
  async listFiles(bucket: string, path?: string) {
    const { data, error } = await supabase.storage.from(bucket).list(path);
    if (error) throw error;
    return data;
  },

  /**
   * Delete a file from a bucket
   */
  async deleteFile(bucket: string, paths: string[]) {
    const { data, error } = await supabase.storage.from(bucket).remove(paths);
    if (error) throw error;
    return data;
  },

  /**
   * Create a signed URL for a file (temporary access)
   */
  async createSignedUrl(bucket: string, path: string, expiresIn = 60) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
    if (error) throw error;
    return data;
  },
};
