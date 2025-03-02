import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

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
      .on(
        "postgres_changes",
        {
          event: options?.event || "*",
          schema: "public",
          table,
          ...(options?.filter && options?.filterValue
            ? { filter: `${options.filter}=eq.${options.filterValue}` }
            : {}),
        },
        async (payload) => {
          // Refetch data when changes occur
          try {
            const { data, error } = await initialQuery();
            if (error) throw error;
            setData(data);
          } catch (error) {
            console.error("Error refetching after realtime update:", error);
          }
        },
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
