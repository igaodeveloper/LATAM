import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type Passenger = Database["public"]["Tables"]["passengers"]["Row"];
type PassengerInsert = Database["public"]["Tables"]["passengers"]["Insert"];
type PassengerUpdate = Database["public"]["Tables"]["passengers"]["Update"];

type PassengerFlight = Database["public"]["Tables"]["passenger_flights"]["Row"];
type PassengerFlightInsert =
  Database["public"]["Tables"]["passenger_flights"]["Insert"];
type PassengerFlightUpdate =
  Database["public"]["Tables"]["passenger_flights"]["Update"];

export const passengerService = {
  async getAll(): Promise<Passenger[]> {
    const { data, error } = await supabase
      .from("passengers")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching passengers:", error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<Passenger | null> {
    const { data, error } = await supabase
      .from("passengers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching passenger with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getByEmail(email: string): Promise<Passenger | null> {
    const { data, error } = await supabase
      .from("passengers")
      .select("*")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "No rows found"
      console.error(`Error fetching passenger with email ${email}:`, error);
      throw error;
    }

    return data;
  },

  async getByMembershipLevel(
    level: Passenger["membership_level"],
  ): Promise<Passenger[]> {
    const { data, error } = await supabase
      .from("passengers")
      .select("*")
      .eq("membership_level", level)
      .order("name", { ascending: true });

    if (error) {
      console.error(
        `Error fetching passengers with membership level ${level}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async create(passenger: PassengerInsert): Promise<Passenger> {
    const { data, error } = await supabase
      .from("passengers")
      .insert([
        {
          ...passenger,
          membership_points: passenger.membership_points || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating passenger:", error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: PassengerUpdate): Promise<Passenger> {
    const { data, error } = await supabase
      .from("passengers")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating passenger with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("passengers").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting passenger with id ${id}:`, error);
      throw error;
    }
  },

  async bookFlight(booking: PassengerFlightInsert): Promise<PassengerFlight> {
    const { data, error } = await supabase
      .from("passenger_flights")
      .insert([
        {
          ...booking,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error booking flight for passenger:", error);
      throw error;
    }

    return data;
  },

  async updateBooking(
    id: string,
    updates: PassengerFlightUpdate,
  ): Promise<PassengerFlight> {
    const { data, error } = await supabase
      .from("passenger_flights")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating booking with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async cancelBooking(id: string): Promise<void> {
    const { error } = await supabase
      .from("passenger_flights")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(`Error cancelling booking with id ${id}:`, error);
      throw error;
    }
  },

  async getPassengerFlights(passengerId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from("passenger_flights")
      .select("*, flight:flights(*)")
      .eq("passenger_id", passengerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `Error fetching flights for passenger ${passengerId}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getUpcomingFlights(passengerId: string): Promise<any[]> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("passenger_flights")
      .select("*, flight:flights(*)")
      .eq("passenger_id", passengerId)
      .not("status", "eq", "cancelled")
      .not("status", "eq", "completed")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `Error fetching upcoming flights for passenger ${passengerId}:`,
        error,
      );
      throw error;
    }

    // Filter flights where departure date is today or in the future
    return (data || []).filter(
      (booking) => booking.flight.departure_date >= today,
    );
  },

  async getPastFlights(passengerId: string): Promise<any[]> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("passenger_flights")
      .select("*, flight:flights(*)")
      .eq("passenger_id", passengerId)
      .or(`status.eq.completed,flight.departure_date.lt.${today}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `Error fetching past flights for passenger ${passengerId}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async checkIn(bookingId: string, seat: string): Promise<PassengerFlight> {
    const { data, error } = await supabase
      .from("passenger_flights")
      .update({
        status: "checked-in",
        seat,
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId)
      .select()
      .single();

    if (error) {
      console.error(
        `Error checking in passenger for booking ${bookingId}:`,
        error,
      );
      throw error;
    }

    return data;
  },

  async addBaggage(baggage: any): Promise<any> {
    const { data, error } = await supabase
      .from("baggage")
      .insert([
        {
          ...baggage,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding baggage:", error);
      throw error;
    }

    return data;
  },

  async updateBaggageStatus(id: string, status: string): Promise<any> {
    const { data, error } = await supabase
      .from("baggage")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating baggage status for id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getBaggageByTracking(trackingNumber: string): Promise<any> {
    const { data, error } = await supabase
      .from("baggage")
      .select(
        "*, passenger_flight:passenger_flights(*, passenger:passengers(*), flight:flights(*))",
      )
      .eq("tracking_number", trackingNumber)
      .single();

    if (error) {
      console.error(
        `Error fetching baggage with tracking number ${trackingNumber}:`,
        error,
      );
      throw error;
    }

    return data;
  },

  async addMembershipPoints(
    passengerId: string,
    points: number,
  ): Promise<Passenger> {
    // First get current points
    const { data: passenger, error: fetchError } = await supabase
      .from("passengers")
      .select("membership_points, membership_level")
      .eq("id", passengerId)
      .single();

    if (fetchError) {
      console.error(
        `Error fetching passenger with id ${passengerId}:`,
        fetchError,
      );
      throw fetchError;
    }

    const newPoints = (passenger.membership_points || 0) + points;

    // Determine if membership level should be upgraded
    let newLevel = passenger.membership_level;
    if (newPoints >= 100000 && newLevel !== "black") {
      newLevel = "platinum";
    } else if (
      newPoints >= 50000 &&
      !["platinum", "black"].includes(newLevel)
    ) {
      newLevel = "gold";
    } else if (
      newPoints >= 25000 &&
      !["gold", "platinum", "black"].includes(newLevel)
    ) {
      newLevel = "silver";
    } else if (newPoints > 0 && newLevel === "none") {
      newLevel = "blue";
    }

    // Update points and possibly level
    const { data, error } = await supabase
      .from("passengers")
      .update({
        membership_points: newPoints,
        membership_level: newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq("id", passengerId)
      .select()
      .single();

    if (error) {
      console.error(
        `Error adding membership points for passenger ${passengerId}:`,
        error,
      );
      throw error;
    }

    return data;
  },

  async getPassengerStats(): Promise<any> {
    const { data: total, error: totalError } = await supabase
      .from("passengers")
      .select("id", { count: "exact" });

    if (totalError) {
      console.error("Error fetching total passenger count:", totalError);
      throw totalError;
    }

    const { count: active, error: activeError } = await supabase
      .from("passengers")
      .select("id", { count: "exact" })
      .eq("status", "active");

    if (activeError) {
      console.error("Error fetching active passenger count:", activeError);
      throw activeError;
    }

    const { data: membershipData, error: membershipError } = await supabase
      .from("passengers")
      .select("membership_level");

    if (membershipError) {
      console.error(
        "Error fetching passenger membership data:",
        membershipError,
      );
      throw membershipError;
    }

    const membershipCounts =
      membershipData?.reduce(
        (acc, passenger) => {
          const level = passenger.membership_level;
          acc[level] = (acc[level] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ) || {};

    const { data: pointsData, error: pointsError } = await supabase
      .from("passengers")
      .select("membership_points");

    if (pointsError) {
      console.error("Error fetching passenger points data:", pointsError);
      throw pointsError;
    }

    const totalPoints =
      pointsData?.reduce(
        (sum, passenger) => sum + passenger.membership_points,
        0,
      ) || 0;
    const averagePoints = pointsData?.length
      ? Math.round(totalPoints / pointsData.length)
      : 0;

    return {
      total: total?.length || 0,
      active: active || 0,
      inactive: (total?.length || 0) - (active || 0),
      membershipCounts,
      totalPoints,
      averagePoints,
    };
  },
};
