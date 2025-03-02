import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type CrewMember = Database["public"]["Tables"]["crew_members"]["Row"];
type CrewMemberInsert = Database["public"]["Tables"]["crew_members"]["Insert"];
type CrewMemberUpdate = Database["public"]["Tables"]["crew_members"]["Update"];

type CrewAssignment = Database["public"]["Tables"]["crew_assignments"]["Row"];
type CrewAssignmentInsert =
  Database["public"]["Tables"]["crew_assignments"]["Insert"];

export const crewService = {
  async getAll(): Promise<CrewMember[]> {
    const { data, error } = await supabase
      .from("crew_members")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching crew members:", error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<CrewMember | null> {
    const { data, error } = await supabase
      .from("crew_members")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching crew member with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getByStatus(status: CrewMember["status"]): Promise<CrewMember[]> {
    const { data, error } = await supabase
      .from("crew_members")
      .select("*")
      .eq("status", status)
      .order("name", { ascending: true });

    if (error) {
      console.error(
        `Error fetching crew members with status ${status}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getByPosition(position: string): Promise<CrewMember[]> {
    const { data, error } = await supabase
      .from("crew_members")
      .select("*")
      .ilike("position", `%${position}%`)
      .order("name", { ascending: true });

    if (error) {
      console.error(
        `Error fetching crew members with position ${position}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getAvailableForFlight(): Promise<CrewMember[]> {
    const { data, error } = await supabase
      .from("crew_members")
      .select("*")
      .eq("status", "available")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching available crew members:", error);
      throw error;
    }

    return data || [];
  },

  async create(crewMember: CrewMemberInsert): Promise<CrewMember> {
    const { data, error } = await supabase
      .from("crew_members")
      .insert([
        {
          ...crewMember,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating crew member:", error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: CrewMemberUpdate): Promise<CrewMember> {
    const { data, error } = await supabase
      .from("crew_members")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating crew member with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("crew_members").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting crew member with id ${id}:`, error);
      throw error;
    }
  },

  async assignToFlight(
    assignment: CrewAssignmentInsert,
  ): Promise<CrewAssignment> {
    const { data, error } = await supabase
      .from("crew_assignments")
      .insert([
        {
          ...assignment,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error assigning crew member to flight:", error);
      throw error;
    }

    // Update the flight's assigned crew count
    const { data: flight, error: flightError } = await supabase
      .from("flights")
      .select("assigned_pilots, assigned_cabin_crew")
      .eq("id", assignment.flight_id)
      .single();

    if (flightError) {
      console.error(
        `Error fetching flight with id ${assignment.flight_id}:`,
        flightError,
      );
      throw flightError;
    }

    const isPilot =
      assignment.role.toLowerCase().includes("pilot") ||
      assignment.role.toLowerCase().includes("captain") ||
      assignment.role.toLowerCase().includes("officer");

    const updateData = isPilot
      ? { assigned_pilots: (flight.assigned_pilots || 0) + 1 }
      : { assigned_cabin_crew: (flight.assigned_cabin_crew || 0) + 1 };

    const { error: updateError } = await supabase
      .from("flights")
      .update(updateData)
      .eq("id", assignment.flight_id);

    if (updateError) {
      console.error(
        `Error updating flight crew count for flight ${assignment.flight_id}:`,
        updateError,
      );
      throw updateError;
    }

    // Update crew member status
    const { error: crewUpdateError } = await supabase
      .from("crew_members")
      .update({
        status: "on-duty",
        next_flight_id: assignment.flight_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", assignment.crew_member_id);

    if (crewUpdateError) {
      console.error(
        `Error updating crew member status for id ${assignment.crew_member_id}:`,
        crewUpdateError,
      );
      throw crewUpdateError;
    }

    return data;
  },

  async removeFromFlight(assignmentId: string): Promise<void> {
    // First get the assignment details
    const { data: assignment, error: fetchError } = await supabase
      .from("crew_assignments")
      .select("*")
      .eq("id", assignmentId)
      .single();

    if (fetchError) {
      console.error(
        `Error fetching crew assignment with id ${assignmentId}:`,
        fetchError,
      );
      throw fetchError;
    }

    // Delete the assignment
    const { error } = await supabase
      .from("crew_assignments")
      .delete()
      .eq("id", assignmentId);

    if (error) {
      console.error(
        `Error removing crew assignment with id ${assignmentId}:`,
        error,
      );
      throw error;
    }

    // Update the flight's assigned crew count
    const { data: flight, error: flightError } = await supabase
      .from("flights")
      .select("assigned_pilots, assigned_cabin_crew")
      .eq("id", assignment.flight_id)
      .single();

    if (flightError) {
      console.error(
        `Error fetching flight with id ${assignment.flight_id}:`,
        flightError,
      );
      throw flightError;
    }

    const isPilot =
      assignment.role.toLowerCase().includes("pilot") ||
      assignment.role.toLowerCase().includes("captain") ||
      assignment.role.toLowerCase().includes("officer");

    const updateData = isPilot
      ? { assigned_pilots: Math.max((flight.assigned_pilots || 0) - 1, 0) }
      : {
          assigned_cabin_crew: Math.max(
            (flight.assigned_cabin_crew || 0) - 1,
            0,
          ),
        };

    const { error: updateError } = await supabase
      .from("flights")
      .update(updateData)
      .eq("id", assignment.flight_id);

    if (updateError) {
      console.error(
        `Error updating flight crew count for flight ${assignment.flight_id}:`,
        updateError,
      );
      throw updateError;
    }

    // Update crew member status if this was their next flight
    const { data: crewMember, error: crewFetchError } = await supabase
      .from("crew_members")
      .select("next_flight_id")
      .eq("id", assignment.crew_member_id)
      .single();

    if (crewFetchError) {
      console.error(
        `Error fetching crew member with id ${assignment.crew_member_id}:`,
        crewFetchError,
      );
      throw crewFetchError;
    }

    if (crewMember.next_flight_id === assignment.flight_id) {
      const { error: crewUpdateError } = await supabase
        .from("crew_members")
        .update({
          status: "available",
          next_flight_id: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", assignment.crew_member_id);

      if (crewUpdateError) {
        console.error(
          `Error updating crew member status for id ${assignment.crew_member_id}:`,
          crewUpdateError,
        );
        throw crewUpdateError;
      }
    }
  },

  async getCrewForFlight(flightId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from("crew_assignments")
      .select("*, crew_member:crew_members(*)")
      .eq("flight_id", flightId);

    if (error) {
      console.error(`Error fetching crew for flight ${flightId}:`, error);
      throw error;
    }

    return data || [];
  },

  async getFlightsForCrew(crewMemberId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from("crew_assignments")
      .select("*, flight:flights(*)")
      .eq("crew_member_id", crewMemberId);

    if (error) {
      console.error(
        `Error fetching flights for crew member ${crewMemberId}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getCrewStats(): Promise<any> {
    const { data: total, error: totalError } = await supabase
      .from("crew_members")
      .select("id", { count: "exact" });

    if (totalError) {
      console.error("Error fetching total crew count:", totalError);
      throw totalError;
    }

    const { count: available, error: availableError } = await supabase
      .from("crew_members")
      .select("id", { count: "exact" })
      .eq("status", "available");

    if (availableError) {
      console.error("Error fetching available crew count:", availableError);
      throw availableError;
    }

    const { count: onDuty, error: onDutyError } = await supabase
      .from("crew_members")
      .select("id", { count: "exact" })
      .eq("status", "on-duty");

    if (onDutyError) {
      console.error("Error fetching on-duty crew count:", onDutyError);
      throw onDutyError;
    }

    const { count: resting, error: restingError } = await supabase
      .from("crew_members")
      .select("id", { count: "exact" })
      .eq("status", "rest");

    if (restingError) {
      console.error("Error fetching resting crew count:", restingError);
      throw restingError;
    }

    const { data: flightHours, error: hoursError } = await supabase
      .from("crew_members")
      .select("flight_hours");

    if (hoursError) {
      console.error("Error fetching crew flight hours:", hoursError);
      throw hoursError;
    }

    const totalFlightHours =
      flightHours?.reduce((sum, crew) => sum + crew.flight_hours, 0) || 0;
    const averageFlightHours = flightHours?.length
      ? totalFlightHours / flightHours.length
      : 0;

    return {
      total: total?.length || 0,
      available: available || 0,
      onDuty: onDuty || 0,
      resting: resting || 0,
      averageFlightHours: Math.round(averageFlightHours * 10) / 10,
    };
  },
};
