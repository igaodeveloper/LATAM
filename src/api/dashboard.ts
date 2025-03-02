import { supabase } from "@/lib/supabase";
import { flightService } from "@/services/flightService";
import { aircraftService } from "@/services/aircraftService";
import { crewService } from "@/services/crewService";
import { alertService } from "@/services/alertService";

export const dashboardApi = {
  /**
   * Get all dashboard data in a single call
   */
  async getDashboardData() {
    const [flightStats, aircraftStats, crewStats, alerts] = await Promise.all([
      flightService.getFlightStats(),
      aircraftService.getAircraftStats(),
      crewService.getCrewStats(),
      alertService.getActive(),
    ]);

    return {
      flightStats,
      aircraftStats,
      crewStats,
      alerts,
    };
  },

  /**
   * Get operational KPIs
   */
  async getOperationalKPIs() {
    const today = new Date().toISOString().split("T")[0];

    // Get on-time performance
    const { data: todayFlights, error: flightsError } = await supabase
      .from("flights")
      .select("status")
      .eq("departure_date", today);

    if (flightsError) throw flightsError;

    const totalFlights = todayFlights?.length || 0;
    const onTimeFlights =
      todayFlights?.filter(
        (f) =>
          f.status === "scheduled" ||
          f.status === "boarding" ||
          f.status === "in-flight",
      ).length || 0;

    const onTimePerformance =
      totalFlights > 0 ? (onTimeFlights / totalFlights) * 100 : 0;

    // Get load factor
    const { data: passengerFlights, error: passengerError } = await supabase
      .from("passenger_flights")
      .select("flight_id")
      .in("status", ["booked", "checked-in", "boarded"]);

    if (passengerError) throw passengerError;

    // This is a simplified calculation - in a real system you'd need to count passengers per flight
    // and compare against aircraft capacity
    const loadFactor = 82.1; // Placeholder value

    // Get revenue metrics
    const revenuePerSeat = 0.11; // Placeholder value

    // Get customer satisfaction
    const customerSatisfaction = 4.2; // Placeholder value

    return {
      onTimePerformance: onTimePerformance.toFixed(1) + "%",
      loadFactor: loadFactor.toFixed(1) + "%",
      revenuePerSeat: "$" + revenuePerSeat,
      customerSatisfaction: customerSatisfaction.toFixed(1) + "/5",
    };
  },

  /**
   * Get route performance data
   */
  async getRoutePerformance() {
    // In a real application, this would query aggregated data from the database
    // This is simplified example data
    return [
      {
        route: "Santiago - Lima",
        performance: 96.2,
        trend: 3.1,
        ranking: 1,
      },
      {
        route: "Santiago - Buenos Aires",
        performance: 94.8,
        trend: 1.7,
        ranking: 2,
      },
      {
        route: "Santiago - São Paulo",
        performance: 93.5,
        trend: 0.8,
        ranking: 3,
      },
      {
        route: "Santiago - Miami",
        performance: 78.3,
        trend: -4.2,
        ranking: 8,
      },
    ];
  },

  /**
   * Get financial metrics
   */
  async getFinancialMetrics() {
    // In a real application, this would query financial data from the database
    // This is simplified example data
    return {
      dailyRevenue: {
        value: "$3.2M",
        change: 5.2,
      },
      averageOccupancy: {
        value: "87.4%",
        change: 1.8,
      },
      revenuePerPassenger: {
        value: "$215",
        change: 2.3,
      },
      costPerSeatKm: {
        value: "$0.082",
        change: -1.5,
      },
    };
  },
};
