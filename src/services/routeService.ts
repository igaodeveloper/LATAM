import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type Route = Database["public"]["Tables"]["routes"]["Row"];
type RouteInsert = Database["public"]["Tables"]["routes"]["Insert"];
type RouteUpdate = Database["public"]["Tables"]["routes"]["Update"];

export const routeService = {
  async getAll(): Promise<Route[]> {
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .order("origin", { ascending: true })
      .order("destination", { ascending: true });

    if (error) {
      console.error("Error fetching routes:", error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<Route | null> {
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching route with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getByOriginDestination(
    origin: string,
    destination: string,
  ): Promise<Route | null> {
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("origin", origin)
      .eq("destination", destination)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "No rows found"
      console.error(
        `Error fetching route from ${origin} to ${destination}:`,
        error,
      );
      throw error;
    }

    return data;
  },

  async getByStatus(status: Route["status"]): Promise<Route[]> {
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("status", status)
      .order("origin", { ascending: true })
      .order("destination", { ascending: true });

    if (error) {
      console.error(`Error fetching routes with status ${status}:`, error);
      throw error;
    }

    return data || [];
  },

  async getByWeatherCondition(
    condition: Route["weather_condition"],
  ): Promise<Route[]> {
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("weather_condition", condition)
      .order("origin", { ascending: true })
      .order("destination", { ascending: true });

    if (error) {
      console.error(
        `Error fetching routes with weather condition ${condition}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async create(route: RouteInsert): Promise<Route> {
    const { data, error } = await supabase
      .from("routes")
      .insert([
        {
          ...route,
          alternate_routes: route.alternate_routes || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating route:", error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: RouteUpdate): Promise<Route> {
    const { data, error } = await supabase
      .from("routes")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating route with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("routes").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting route with id ${id}:`, error);
      throw error;
    }
  },

  async updateWeatherCondition(
    id: string,
    condition: Route["weather_condition"],
  ): Promise<Route> {
    const { data, error } = await supabase
      .from("routes")
      .update({
        weather_condition: condition,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating weather condition for route ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getRouteStats(): Promise<any> {
    const { data: total, error: totalError } = await supabase
      .from("routes")
      .select("id", { count: "exact" });

    if (totalError) {
      console.error("Error fetching total routes count:", totalError);
      throw totalError;
    }

    const { count: active, error: activeError } = await supabase
      .from("routes")
      .select("id", { count: "exact" })
      .eq("status", "active");

    if (activeError) {
      console.error("Error fetching active routes count:", activeError);
      throw activeError;
    }

    const { count: seasonal, error: seasonalError } = await supabase
      .from("routes")
      .select("id", { count: "exact" })
      .eq("status", "seasonal");

    if (seasonalError) {
      console.error("Error fetching seasonal routes count:", seasonalError);
      throw seasonalError;
    }

    const { count: inactive, error: inactiveError } = await supabase
      .from("routes")
      .select("id", { count: "exact" })
      .eq("status", "inactive");

    if (inactiveError) {
      console.error("Error fetching inactive routes count:", inactiveError);
      throw inactiveError;
    }

    const { data: weatherData, error: weatherError } = await supabase
      .from("routes")
      .select("weather_condition");

    if (weatherError) {
      console.error(
        "Error fetching routes weather condition data:",
        weatherError,
      );
      throw weatherError;
    }

    const weatherCounts =
      weatherData?.reduce(
        (acc, route) => {
          const condition = route.weather_condition;
          acc[condition] = (acc[condition] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ) || {};

    const { data: distanceData, error: distanceError } = await supabase
      .from("routes")
      .select("distance");

    if (distanceError) {
      console.error("Error fetching routes distance data:", distanceError);
      throw distanceError;
    }

    const totalDistance =
      distanceData?.reduce((sum, route) => sum + route.distance, 0) || 0;
    const averageDistance = distanceData?.length
      ? Math.round(totalDistance / distanceData.length)
      : 0;

    return {
      total: total?.length || 0,
      active: active || 0,
      seasonal: seasonal || 0,
      inactive: inactive || 0,
      weatherCounts,
      totalDistance,
      averageDistance,
    };
  },
};
