import { aircraftService } from "@/services/aircraftService";
import { alertService } from "@/services/alertService";
import { crewService } from "@/services/crewService";
import { flightService } from "@/services/flightService";
import { maintenanceService } from "@/services/maintenanceService";
import { passengerService } from "@/services/passengerService";
import { routeService } from "@/services/routeService";

export const api = {
  aircraft: aircraftService,
  alerts: alertService,
  crew: crewService,
  flights: flightService,
  maintenance: maintenanceService,
  passengers: passengerService,
  routes: routeService,
};
