import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type Aircraft = Database["public"]["Tables"]["aircraft"]["Row"];
type AircraftInsert = Database["public"]["Tables"]["aircraft"]["Insert"];
type AircraftUpdate = Database["public"]["Tables"]["aircraft"]["Update"];

export const aircraftService = {
  async getAll(): Promise<Aircraft[]> {
    const { data, error } = await supabase
      .from("aircraft")
      .select("*")
      .order("registration", { ascending: true });

    if (error) {
      console.error("Error fetching aircraft:", error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<Aircraft | null> {
    const { data, error } = await supabase
      .from("aircraft")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching aircraft with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getAvailable(): Promise<Aircraft[]> {
    const { data, error } = await supabase
      .from("aircraft")
      .select("*")
      .eq("status", "available")
      .order("registration", { ascending: true });

    if (error) {
      console.error("Error fetching available aircraft:", error);
      throw error;
    }

    return data || [];
  },

  async getByMaintenanceStatus(
    status: Aircraft["maintenance_status"],
  ): Promise<Aircraft[]> {
    const { data, error } = await supabase
      .from("aircraft")
      .select("*")
      .eq("maintenance_status", status)
      .order("next_maintenance", { ascending: true });

    if (error) {
      console.error(
        `Error fetching aircraft with maintenance status ${status}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async create(aircraft: AircraftInsert): Promise<Aircraft> {
    const { data, error } = await supabase
      .from("aircraft")
      .insert([
        {
          ...aircraft,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating aircraft:", error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: AircraftUpdate): Promise<Aircraft> {
    const { data, error } = await supabase
      .from("aircraft")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating aircraft with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("aircraft").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting aircraft with id ${id}:`, error);
      throw error;
    }
  },

  async getWithMaintenanceTasks(
    id: string,
  ): Promise<{ aircraft: Aircraft; maintenanceTasks: any[] }> {
    const { data: aircraft, error: aircraftError } = await supabase
      .from("aircraft")
      .select("*")
      .eq("id", id)
      .single();

    if (aircraftError) {
      console.error(`Error fetching aircraft with id ${id}:`, aircraftError);
      throw aircraftError;
    }

    const { data: maintenanceTasks, error: tasksError } = await supabase
      .from("maintenance_tasks")
      .select("*")
      .eq("aircraft_id", id)
      .order("scheduled_date", { ascending: true });

    if (tasksError) {
      console.error(
        `Error fetching maintenance tasks for aircraft ${id}:`,
        tasksError,
      );
      throw tasksError;
    }

    return {
      aircraft,
      maintenanceTasks: maintenanceTasks || [],
    };
  },

  async getAircraftStats(): Promise<any> {
    const { data: total, error: totalError } = await supabase
      .from("aircraft")
      .select("id", { count: "exact" });

    if (totalError) {
      console.error("Error fetching total aircraft count:", totalError);
      throw totalError;
    }

    const { count: available, error: availableError } = await supabase
      .from("aircraft")
      .select("id", { count: "exact" })
      .eq("status", "available");

    if (availableError) {
      console.error("Error fetching available aircraft count:", availableError);
      throw availableError;
    }

    const { count: inMaintenance, error: maintenanceError } = await supabase
      .from("aircraft")
      .select("id", { count: "exact" })
      .in("status", ["maintenance", "scheduled-maintenance"]);

    if (maintenanceError) {
      console.error(
        "Error fetching in-maintenance aircraft count:",
        maintenanceError,
      );
      throw maintenanceError;
    }

    const { data: alerts, error: alertsError } = await supabase
      .from("aircraft")
      .select("alerts")
      .gt("alerts", 0);

    if (alertsError) {
      console.error("Error fetching aircraft alerts:", alertsError);
      throw alertsError;
    }

    const totalAlerts =
      alerts?.reduce((sum, aircraft) => sum + aircraft.alerts, 0) || 0;

    return {
      total: total?.length || 0,
      available: available || 0,
      inMaintenance: inMaintenance || 0,
      alerts: totalAlerts,
    };
  },
};
