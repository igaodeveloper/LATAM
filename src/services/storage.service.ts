import { supabase, handleSupabaseError, SupabaseResponse } from '../lib/supabase';
import { FileObject } from '@supabase/storage-js';

class StorageService {
  private readonly BUCKET_NAME = 'portfolio-assets';

  async uploadFile(
    file: File,
    path: string,
    options: {
      cacheControl?: string;
      upsert?: boolean;
    } = {}
  ): Promise<SupabaseResponse<{ path: string }>> {
    try {
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(path, file, {
          cacheControl: options.cacheControl || '3600',
          upsert: options.upsert || false,
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async deleteFile(path: string): Promise<SupabaseResponse<void>> {
    try {
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([path]);

      if (error) throw error;
      return { data: null, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async getFileUrl(path: string): Promise<SupabaseResponse<string>> {
    try {
      const { data } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(path);

      return { data: data.publicUrl, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async listFiles(path: string): Promise<SupabaseResponse<{ name: string; path: string }[]>> {
    try {
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .list(path);

      if (error) throw error;
      
      const mappedData = data.map((file: FileObject) => ({
        name: file.name,
        path: `${path}/${file.name}`,
      }));

      return { data: mappedData, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }

  async downloadFile(path: string): Promise<SupabaseResponse<Blob>> {
    try {
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .download(path);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      const { error: errorMessage } = handleSupabaseError(error);
      return { data: null, error: errorMessage };
    }
  }
}

export const storageService = new StorageService(); 