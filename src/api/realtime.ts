import { supabase } from "@/lib/supabase";

export const realtime = {
  /**
   * Subscribe to changes on a table
   */
  subscribeToTable(
    table: string,
    event: "INSERT" | "UPDATE" | "DELETE" | "*" = "*",
    callback: (payload: any) => void,
    filter?: { column: string; value: string },
  ) {
    const channel = supabase
      .channel(`table-changes-${table}`)
      .on(
        "postgres_changes",
        {
          event,
          schema: "public",
          table,
          ...(filter ? { filter: `${filter.column}=eq.${filter.value}` } : {}),
        },
        callback,
      )
      .subscribe();

    return channel;
  },

  /**
   * Subscribe to presence changes
   */
  subscribeToPresence(
    channel: string,
    callback: (payload: {
      joins: Record<string, any>;
      leaves: Record<string, any>;
    }) => void,
  ) {
    const presenceChannel = supabase.channel(channel);

    presenceChannel
      .on("presence", { event: "sync" }, () => {
        const state = presenceChannel.presenceState();
        callback({
          joins: {},
          leaves: {},
        });
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        callback({
          joins: { [key]: newPresences },
          leaves: {},
        });
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        callback({
          joins: {},
          leaves: { [key]: leftPresences },
        });
      })
      .subscribe();

    return presenceChannel;
  },

  /**
   * Track presence in a channel
   */
  trackPresence(
    channel: string,
    userId: string,
    userInfo: Record<string, any> = {},
  ) {
    const presenceChannel = supabase.channel(channel);

    presenceChannel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await presenceChannel.track({
          user_id: userId,
          online_at: new Date().toISOString(),
          ...userInfo,
        });
      }
    });

    return presenceChannel;
  },

  /**
   * Unsubscribe from a channel
   */
  unsubscribe(channel: any) {
    supabase.removeChannel(channel);
  },
};
