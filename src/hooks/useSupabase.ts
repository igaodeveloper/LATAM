import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import type { RealtimeChannel, RealtimePostgresChangesPayload, RealtimePostgresChangesFilter } from '@supabase/realtime-js';
import { REALTIME_LISTEN_TYPES } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

type TableName = keyof Database['public']['Tables'];
type Row<T extends TableName> = Database['public']['Tables'][T]['Row'];

export function useSupabase() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading, supabase };
}

export function useSupabaseQuery<T = any>(
  query: () => Promise<{ data: T | null; error: any }>,
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await query();
        if (error) throw error;
        setData(data);
      } catch (error) {
        console.error("Error executing Supabase query:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    error,
    loading,
    refetch: async () => {
      setLoading(true);
      try {
        const { data, error } = await query();
        if (error) throw error;
        setData(data);
        setError(null);
      } catch (error) {
        console.error("Error refetching Supabase query:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
  };
}

export function useSupabaseRealtime<T = any>(
  table: string,
  initialQuery: () => Promise<{ data: T | null; error: any }>,
  options?: {
    event?: "INSERT" | "UPDATE" | "DELETE" | "*";
    filter?: string;
    filterValue?: any;
  },
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const { data, error } = await initialQuery();
        if (error) throw error;
        setData(data);
      } catch (error) {
        console.error("Error executing initial Supabase query:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // Set up realtime subscription
    let subscription = supabase
      .channel("table-changes")
      .on('system',
        {
          event: options?.event || "*",
          schema: "public",
          table: table,
          filter: options?.filter && options?.filterValue
            ? `${options.filter}=eq.${options.filterValue}`
            : undefined
        },
        async (payload) => {
          try {
            const { data, error } = await initialQuery();
            if (error) throw error;
            setData(data);
          } catch (error) {
            console.error("Error refetching after realtime update:", error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [table, options?.event, options?.filter, options?.filterValue]);

  return {
    data,
    error,
    loading,
    refetch: async () => {
      setLoading(true);
      try {
        const { data, error } = await initialQuery();
        if (error) throw error;
        setData(data);
        setError(null);
      } catch (error) {
        console.error("Error refetching Supabase query:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
  };
}

export function useSupabaseTable<T extends TableName>(
  tableName: T,
  options: {
    event?: 'INSERT' | 'UPDATE' | 'DELETE';
    filter?: string;
  } = {}
) {
  const [data, setData] = useState<Row<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    fetchData();
    subscribeToChanges();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [tableName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: initialData, error: queryError } = await supabase
        .from(tableName)
        .select('*');

      if (queryError) {
        throw queryError;
      }

      setData(initialData as Row<T>[]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const newChannel = supabase
      .channel('table_changes')
      .on('system',
        {
          event: options.event || "*",
          schema: 'public',
          table: tableName,
          filter: options.filter
        },
        (payload: RealtimePostgresChangesPayload<Row<T>>) => {
          if (payload.eventType === 'INSERT') {
            setData((current) => [...current, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setData((current) =>
              current.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setData((current) =>
              current.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    setChannel(newChannel);
  };

  return { data, loading, error };
}
