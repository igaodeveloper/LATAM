import { supabase } from '../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  subscribeToProfile(
    userId: string,
    callback: (payload: any) => void
  ): RealtimeChannel {
    const channel = supabase
      .channel(`profile:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(`profile:${userId}`, channel);
    return channel;
  }

  subscribeToProjects(
    userId: string,
    callback: (payload: any) => void
  ): RealtimeChannel {
    const channel = supabase
      .channel(`projects:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(`projects:${userId}`, channel);
    return channel;
  }

  subscribeToExperiences(
    userId: string,
    callback: (payload: any) => void
  ): RealtimeChannel {
    const channel = supabase
      .channel(`experiences:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'experiences',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(`experiences:${userId}`, channel);
    return channel;
  }

  subscribeToEducation(
    userId: string,
    callback: (payload: any) => void
  ): RealtimeChannel {
    const channel = supabase
      .channel(`education:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'education',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(`education:${userId}`, channel);
    return channel;
  }

  subscribeToSkills(
    userId: string,
    callback: (payload: any) => void
  ): RealtimeChannel {
    const channel = supabase
      .channel(`skills:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skills',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(`skills:${userId}`, channel);
    return channel;
  }

  subscribeToContact(
    userId: string,
    callback: (payload: any) => void
  ): RealtimeChannel {
    const channel = supabase
      .channel(`contact:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contacts',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(`contact:${userId}`, channel);
    return channel;
  }

  unsubscribeFromChannel(channelKey: string): void {
    const channel = this.channels.get(channelKey);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(channelKey);
    }
  }

  unsubscribeFromAllChannels(): void {
    this.channels.forEach((channel) => {
      channel.unsubscribe();
    });
    this.channels.clear();
  }
}

export const realtimeService = new RealtimeService(); 