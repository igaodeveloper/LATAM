import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type MaintenanceTask = Database["public"]["Tables"]["maintenance_tasks"]["Row"];
type MaintenanceTaskInsert =
  Database["public"]["Tables"]["maintenance_tasks"]["Insert"];
type MaintenanceTaskUpdate =
  Database["public"]["Tables"]["maintenance_tasks"]["Update"];

export const maintenanceService = {
  async getAll(): Promise<MaintenanceTask[]> {
    const { data, error } = await supabase
      .from("maintenance_tasks")
      .select("*")
      .order("scheduled_date", { ascending: true });

    if (error) {
      console.error("Error fetching maintenance tasks:", error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<MaintenanceTask | null> {
    const { data, error } = await supabase
      .from("maintenance_tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching maintenance task with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getByStatus(
    status: MaintenanceTask["status"],
  ): Promise<MaintenanceTask[]> {
    const { data, error } = await supabase
      .from("maintenance_tasks")
      .select("*")
      .eq("status", status)
      .order("scheduled_date", { ascending: true });

    if (error) {
      console.error(
        `Error fetching maintenance tasks with status ${status}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getByAircraft(aircraftId: string): Promise<MaintenanceTask[]> {
    const { data, error } = await supabase
      .from("maintenance_tasks")
      .select("*")
      .eq("aircraft_id", aircraftId)
      .order("scheduled_date", { ascending: true });

    if (error) {
      console.error(
        `Error fetching maintenance tasks for aircraft ${aircraftId}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getUpcoming(days: number = 30): Promise<MaintenanceTask[]> {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + days);

    const { data, error } = await supabase
      .from("maintenance_tasks")
      .select("*")
      .gte("scheduled_date", today.toISOString().split("T")[0])
      .lte("scheduled_date", endDate.toISOString().split("T")[0])
      .in("status", ["scheduled", "delayed"])
      .order("scheduled_date", { ascending: true });

    if (error) {
      console.error("Error fetching upcoming maintenance tasks:", error);
      throw error;
    }

    return data || [];
  },

  async create(task: MaintenanceTaskInsert): Promise<MaintenanceTask> {
    const { data, error } = await supabase
      .from("maintenance_tasks")
      .insert([
        {
          ...task,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating maintenance task:", error);
      throw error;
    }

    return data;
  },

  async update(
    id: string,
    updates: MaintenanceTaskUpdate,
  ): Promise<MaintenanceTask> {
    const { data, error } = await supabase
      .from("maintenance_tasks")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating maintenance task with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("maintenance_tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Error deleting maintenance task with id ${id}:`, error);
      throw error;
    }
  },

  async updateStatus(
    id: string,
    status: MaintenanceTask["status"],
  ): Promise<MaintenanceTask> {
    const { data, error } = await supabase
      .from("maintenance_tasks")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating status for maintenance task ${id}:`, error);
      throw error;
    }

    // If task is completed, update the aircraft's last maintenance date
    if (status === "completed") {
      const task = data;
      const today = new Date().toISOString().split("T")[0];

      const { error: aircraftError } = await supabase
        .from("aircraft")
        .update({
          last_maintenance: today,
          maintenance_status: "up-to-date",
          alerts: 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", task.aircraft_id);

      if (aircraftError) {
        console.error(
          `Error updating aircraft maintenance status for ${task.aircraft_id}:`,
          aircraftError,
        );
        throw aircraftError;
      }
    }

    return data;
  },

  async getTaskWithDetails(id: string): Promise<any> {
    const { data: task, error: taskError } = await supabase
      .from("maintenance_tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (taskError) {
      console.error(
        `Error fetching maintenance task with id ${id}:`,
        taskError,
      );
      throw taskError;
    }

    const { data: aircraft, error: aircraftError } = await supabase
      .from("aircraft")
      .select("*")
      .eq("id", task.aircraft_id)
      .single();

    if (aircraftError) {
      console.error(
        `Error fetching aircraft for maintenance task ${id}:`,
        aircraftError,
      );
      throw aircraftError;
    }

    return {
      task,
      aircraft,
    };
  },

  async getMaintenanceStats(): Promise<any> {
    const { data: total, error: totalError } = await supabase
      .from("maintenance_tasks")
      .select("id", { count: "exact" });

    if (totalError) {
      console.error(
        "Error fetching total maintenance tasks count:",
        totalError,
      );
      throw totalError;
    }

    const { count: scheduled, error: scheduledError } = await supabase
      .from("maintenance_tasks")
      .select("id", { count: "exact" })
      .eq("status", "scheduled");

    if (scheduledError) {
      console.error(
        "Error fetching scheduled maintenance tasks count:",
        scheduledError,
      );
      throw scheduledError;
    }

    const { count: inProgress, error: inProgressError } = await supabase
      .from("maintenance_tasks")
      .select("id", { count: "exact" })
      .eq("status", "in-progress");

    if (inProgressError) {
      console.error(
        "Error fetching in-progress maintenance tasks count:",
        inProgressError,
      );
      throw inProgressError;
    }

    const { count: completed, error: completedError } = await supabase
      .from("maintenance_tasks")
      .select("id", { count: "exact" })
      .eq("status", "completed");

    if (completedError) {
      console.error(
        "Error fetching completed maintenance tasks count:",
        completedError,
      );
      throw completedError;
    }

    const { count: delayed, error: delayedError } = await supabase
      .from("maintenance_tasks")
      .select("id", { count: "exact" })
      .eq("status", "delayed");

    if (delayedError) {
      console.error(
        "Error fetching delayed maintenance tasks count:",
        delayedError,
      );
      throw delayedError;
    }

    const { data: priorityData, error: priorityError } = await supabase
      .from("maintenance_tasks")
      .select("priority");

    if (priorityError) {
      console.error(
        "Error fetching maintenance tasks priority data:",
        priorityError,
      );
      throw priorityError;
    }

    const priorityCounts =
      priorityData?.reduce(
        (acc, task) => {
          const priority = task.priority;
          acc[priority] = (acc[priority] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ) || {};

    return {
      total: total?.length || 0,
      scheduled: scheduled || 0,
      inProgress: inProgress || 0,
      completed: completed || 0,
      delayed: delayed || 0,
      priorityCounts,
    };
  },
};
