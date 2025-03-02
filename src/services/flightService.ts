import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type Flight = Database["public"]["Tables"]["flights"]["Row"];
type FlightInsert = Database["public"]["Tables"]["flights"]["Insert"];
type FlightUpdate = Database["public"]["Tables"]["flights"]["Update"];

export const flightService = {
  async getAll(): Promise<Flight[]> {
    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .order("departure_date", { ascending: true })
      .order("departure_time", { ascending: true });

    if (error) {
      console.error("Error fetching flights:", error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<Flight | null> {
    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching flight with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getByStatus(status: Flight["status"]): Promise<Flight[]> {
    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .eq("status", status)
      .order("departure_date", { ascending: true })
      .order("departure_time", { ascending: true });

    if (error) {
      console.error(`Error fetching flights with status ${status}:`, error);
      throw error;
    }

    return data || [];
  },

  async getUpcomingFlights(days: number = 7): Promise<Flight[]> {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + days);

    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .gte("departure_date", today.toISOString().split("T")[0])
      .lte("departure_date", endDate.toISOString().split("T")[0])
      .in("status", ["scheduled", "boarding"])
      .order("departure_date", { ascending: true })
      .order("departure_time", { ascending: true });

    if (error) {
      console.error("Error fetching upcoming flights:", error);
      throw error;
    }

    return data || [];
  },

  async getTodayFlights(): Promise<Flight[]> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .eq("departure_date", today)
      .order("departure_time", { ascending: true });

    if (error) {
      console.error("Error fetching today's flights:", error);
      throw error;
    }

    return data || [];
  },

  async create(flight: FlightInsert): Promise<Flight> {
    const { data, error } = await supabase
      .from("flights")
      .insert([
        {
          ...flight,
          assigned_pilots: flight.assigned_pilots || 0,
          assigned_cabin_crew: flight.assigned_cabin_crew || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating flight:", error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: FlightUpdate): Promise<Flight> {
    const { data, error } = await supabase
      .from("flights")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating flight with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("flights").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting flight with id ${id}:`, error);
      throw error;
    }
  },

  async getFlightWithDetails(id: string): Promise<any> {
    const { data: flight, error: flightError } = await supabase
      .from("flights")
      .select("*")
      .eq("id", id)
      .single();

    if (flightError) {
      console.error(`Error fetching flight with id ${id}:`, flightError);
      throw flightError;
    }

    // Get aircraft details if available
    let aircraft = null;
    if (flight.aircraft_id) {
      const { data: aircraftData, error: aircraftError } = await supabase
        .from("aircraft")
        .select("*")
        .eq("id", flight.aircraft_id)
        .single();

      if (aircraftError && aircraftError.code !== "PGRST116") {
        // PGRST116 is "No rows found"
        console.error(
          `Error fetching aircraft for flight ${id}:`,
          aircraftError,
        );
        throw aircraftError;
      }

      aircraft = aircraftData;
    }

    // Get crew assignments
    const { data: crewAssignments, error: crewError } = await supabase
      .from("crew_assignments")
      .select("*, crew_member:crew_members(*)")
      .eq("flight_id", id);

    if (crewError) {
      console.error(
        `Error fetching crew assignments for flight ${id}:`,
        crewError,
      );
      throw crewError;
    }

    // Get passenger bookings
    const { data: passengerFlights, error: passengersError } = await supabase
      .from("passenger_flights")
      .select("*, passenger:passengers(*)")
      .eq("flight_id", id);

    if (passengersError) {
      console.error(
        `Error fetching passenger bookings for flight ${id}:`,
        passengersError,
      );
      throw passengersError;
    }

    return {
      flight,
      aircraft,
      crew: crewAssignments || [],
      passengers: passengerFlights || [],
    };
  },

  async getFlightStats(): Promise<any> {
    const today = new Date().toISOString().split("T")[0];

    const { data: todayFlights, error: todayError } = await supabase
      .from("flights")
      .select("id, status")
      .eq("departure_date", today);

    if (todayError) {
      console.error("Error fetching today's flights:", todayError);
      throw todayError;
    }

    const { data: allFlights, error: allError } = await supabase
      .from("flights")
      .select("id, status")
      .gte("departure_date", today);

    if (allError) {
      console.error("Error fetching all flights:", allError);
      throw allError;
    }

    const totalToday = todayFlights?.length || 0;
    const onTime =
      todayFlights?.filter(
        (f) =>
          f.status === "scheduled" ||
          f.status === "boarding" ||
          f.status === "in-flight",
      ).length || 0;
    const delayed =
      todayFlights?.filter((f) => f.status === "delayed").length || 0;
    const cancelled =
      todayFlights?.filter((f) => f.status === "cancelled").length || 0;
    const completed =
      todayFlights?.filter((f) => f.status === "completed").length || 0;

    const punctualityRate =
      totalToday > 0 ? ((onTime / totalToday) * 100).toFixed(1) : "0";

    return {
      totalToday,
      onTime,
      delayed,
      cancelled,
      completed,
      punctualityRate: `${punctualityRate}%`,
      totalUpcoming: allFlights?.length || 0,
    };
  },
};
