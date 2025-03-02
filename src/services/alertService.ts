import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type OperationalAlert =
  Database["public"]["Tables"]["operational_alerts"]["Row"];
type OperationalAlertInsert =
  Database["public"]["Tables"]["operational_alerts"]["Insert"];
type OperationalAlertUpdate =
  Database["public"]["Tables"]["operational_alerts"]["Update"];

export const alertService = {
  async getAll(): Promise<OperationalAlert[]> {
    const { data, error } = await supabase
      .from("operational_alerts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching operational alerts:", error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<OperationalAlert | null> {
    const { data, error } = await supabase
      .from("operational_alerts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching operational alert with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getActive(): Promise<OperationalAlert[]> {
    const { data, error } = await supabase
      .from("operational_alerts")
      .select("*")
      .eq("status", "active")
      .order("severity", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching active operational alerts:", error);
      throw error;
    }

    return data || [];
  },

  async getByType(type: OperationalAlert["type"]): Promise<OperationalAlert[]> {
    const { data, error } = await supabase
      .from("operational_alerts")
      .select("*")
      .eq("type", type)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `Error fetching operational alerts with type ${type}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getBySeverity(
    severity: OperationalAlert["severity"],
  ): Promise<OperationalAlert[]> {
    const { data, error } = await supabase
      .from("operational_alerts")
      .select("*")
      .eq("severity", severity)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `Error fetching operational alerts with severity ${severity}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async create(alert: OperationalAlertInsert): Promise<OperationalAlert> {
    const { data, error } = await supabase
      .from("operational_alerts")
      .insert([
        {
          ...alert,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating operational alert:", error);
      throw error;
    }

    return data;
  },

  async update(
    id: string,
    updates: OperationalAlertUpdate,
  ): Promise<OperationalAlert> {
    const { data, error } = await supabase
      .from("operational_alerts")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating operational alert with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("operational_alerts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Error deleting operational alert with id ${id}:`, error);
      throw error;
    }
  },

  async acknowledge(id: string): Promise<OperationalAlert> {
    const { data, error } = await supabase
      .from("operational_alerts")
      .update({
        status: "acknowledged",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        `Error acknowledging operational alert with id ${id}:`,
        error,
      );
      throw error;
    }

    return data;
  },

  async resolve(id: string): Promise<OperationalAlert> {
    const { data, error } = await supabase
      .from("operational_alerts")
      .update({
        status: "resolved",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error resolving operational alert with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getAlertWithDetails(id: string): Promise<any> {
    const { data: alert, error: alertError } = await supabase
      .from("operational_alerts")
      .select("*")
      .eq("id", id)
      .single();

    if (alertError) {
      console.error(
        `Error fetching operational alert with id ${id}:`,
        alertError,
      );
      throw alertError;
    }

    let relatedFlight = null;
    if (alert.related_flight_id) {
      const { data: flight, error: flightError } = await supabase
        .from("flights")
        .select("*")
        .eq("id", alert.related_flight_id)
        .single();

      if (flightError && flightError.code !== "PGRST116") {
        // PGRST116 is "No rows found"
        console.error(
          `Error fetching related flight for alert ${id}:`,
          flightError,
        );
        throw flightError;
      }

      relatedFlight = flight;
    }

    let relatedAircraft = null;
    if (alert.related_aircraft_id) {
      const { data: aircraft, error: aircraftError } = await supabase
        .from("aircraft")
        .select("*")
        .eq("id", alert.related_aircraft_id)
        .single();

      if (aircraftError && aircraftError.code !== "PGRST116") {
        // PGRST116 is "No rows found"
        console.error(
          `Error fetching related aircraft for alert ${id}:`,
          aircraftError,
        );
        throw aircraftError;
      }

      relatedAircraft = aircraft;
    }

    return {
      alert,
      relatedFlight,
      relatedAircraft,
    };
  },

  async getAlertStats(): Promise<any> {
    const { data: total, error: totalError } = await supabase
      .from("operational_alerts")
      .select("id", { count: "exact" });

    if (totalError) {
      console.error(
        "Error fetching total operational alerts count:",
        totalError,
      );
      throw totalError;
    }

    const { count: active, error: activeError } = await supabase
      .from("operational_alerts")
      .select("id", { count: "exact" })
      .eq("status", "active");

    if (activeError) {
      console.error(
        "Error fetching active operational alerts count:",
        activeError,
      );
      throw activeError;
    }

    const { count: acknowledged, error: acknowledgedError } = await supabase
      .from("operational_alerts")
      .select("id", { count: "exact" })
      .eq("status", "acknowledged");

    if (acknowledgedError) {
      console.error(
        "Error fetching acknowledged operational alerts count:",
        acknowledgedError,
      );
      throw acknowledgedError;
    }

    const { count: resolved, error: resolvedError } = await supabase
      .from("operational_alerts")
      .select("id", { count: "exact" })
      .eq("status", "resolved");

    if (resolvedError) {
      console.error(
        "Error fetching resolved operational alerts count:",
        resolvedError,
      );
      throw resolvedError;
    }

    const { data: typeData, error: typeError } = await supabase
      .from("operational_alerts")
      .select("type");

    if (typeError) {
      console.error("Error fetching operational alerts type data:", typeError);
      throw typeError;
    }

    const typeCounts =
      typeData?.reduce(
        (acc, alert) => {
          const type = alert.type;
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ) || {};

    const { data: severityData, error: severityError } = await supabase
      .from("operational_alerts")
      .select("severity");

    if (severityError) {
      console.error(
        "Error fetching operational alerts severity data:",
        severityError,
      );
      throw severityError;
    }

    const severityCounts =
      severityData?.reduce(
        (acc, alert) => {
          const severity = alert.severity;
          acc[severity] = (acc[severity] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ) || {};

    return {
      total: total?.length || 0,
      active: active || 0,
      acknowledged: acknowledged || 0,
      resolved: resolved || 0,
      typeCounts,
      severityCounts,
    };
  },
};
