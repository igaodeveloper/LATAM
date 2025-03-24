export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      aircraft: {
        Row: {
          id: string;
          registration: string;
          model: string;
          status:
            | "available"
            | "in-flight"
            | "maintenance"
            | "scheduled-maintenance";
          location: string;
          flight_hours: number;
          last_maintenance: string;
          next_maintenance: string;
          maintenance_status: "up-to-date" | "due-soon" | "overdue";
          alerts: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          registration: string;
          model: string;
          status:
            | "available"
            | "in-flight"
            | "maintenance"
            | "scheduled-maintenance";
          location: string;
          flight_hours: number;
          last_maintenance: string;
          next_maintenance: string;
          maintenance_status: "up-to-date" | "due-soon" | "overdue";
          alerts?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          registration?: string;
          model?: string;
          status?:
            | "available"
            | "in-flight"
            | "maintenance"
            | "scheduled-maintenance";
          location?: string;
          flight_hours?: number;
          last_maintenance?: string;
          next_maintenance?: string;
          maintenance_status?: "up-to-date" | "due-soon" | "overdue";
          alerts?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      crew_members: {
        Row: {
          id: string;
          name: string;
          position: string;
          status: "available" | "on-duty" | "rest" | "training" | "leave";
          qualifications: string[];
          flight_hours: number;
          rest_hours: number;
          next_flight_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          position: string;
          status: "available" | "on-duty" | "rest" | "training" | "leave";
          qualifications: string[];
          flight_hours: number;
          rest_hours: number;
          next_flight_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          position?: string;
          status?: "available" | "on-duty" | "rest" | "training" | "leave";
          qualifications?: string[];
          flight_hours?: number;
          rest_hours?: number;
          next_flight_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "crew_members_next_flight_id_fkey";
            columns: ["next_flight_id"];
            referencedRelation: "flights";
            referencedColumns: ["id"];
          },
        ];
      };
      flights: {
        Row: {
          id: string;
          flight_number: string;
          origin: string;
          destination: string;
          departure_date: string;
          departure_time: string;
          arrival_time: string;
          aircraft_id: string | null;
          status:
            | "scheduled"
            | "boarding"
            | "in-flight"
            | "completed"
            | "cancelled";
          required_pilots: number;
          required_cabin_crew: number;
          assigned_pilots: number;
          assigned_cabin_crew: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          flight_number: string;
          origin: string;
          destination: string;
          departure_date: string;
          departure_time: string;
          arrival_time: string;
          aircraft_id?: string | null;
          status:
            | "scheduled"
            | "boarding"
            | "in-flight"
            | "completed"
            | "cancelled";
          required_pilots: number;
          required_cabin_crew: number;
          assigned_pilots?: number;
          assigned_cabin_crew?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          flight_number?: string;
          origin?: string;
          destination?: string;
          departure_date?: string;
          departure_time?: string;
          arrival_time?: string;
          aircraft_id?: string | null;
          status?:
            | "scheduled"
            | "boarding"
            | "in-flight"
            | "completed"
            | "cancelled";
          required_pilots?: number;
          required_cabin_crew?: number;
          assigned_pilots?: number;
          assigned_cabin_crew?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "flights_aircraft_id_fkey";
            columns: ["aircraft_id"];
            referencedRelation: "aircraft";
            referencedColumns: ["id"];
          },
        ];
      };
      maintenance_tasks: {
        Row: {
          id: string;
          aircraft_id: string;
          task_type: "routine" | "repair" | "inspection" | "overhaul";
          description: string;
          scheduled_date: string;
          estimated_duration: string;
          status: "scheduled" | "in-progress" | "completed" | "delayed";
          assigned_to: string;
          priority: "low" | "medium" | "high" | "critical";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          aircraft_id: string;
          task_type: "routine" | "repair" | "inspection" | "overhaul";
          description: string;
          scheduled_date: string;
          estimated_duration: string;
          status: "scheduled" | "in-progress" | "completed" | "delayed";
          assigned_to: string;
          priority: "low" | "medium" | "high" | "critical";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          aircraft_id?: string;
          task_type?: "routine" | "repair" | "inspection" | "overhaul";
          description?: string;
          scheduled_date?: string;
          estimated_duration?: string;
          status?: "scheduled" | "in-progress" | "completed" | "delayed";
          assigned_to?: string;
          priority?: "low" | "medium" | "high" | "critical";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "maintenance_tasks_aircraft_id_fkey";
            columns: ["aircraft_id"];
            referencedRelation: "aircraft";
            referencedColumns: ["id"];
          },
        ];
      };
      passengers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          status: "active" | "inactive";
          membership_level:
            | "blue"
            | "silver"
            | "gold"
            | "platinum"
            | "black"
            | "none";
          membership_points: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          status: "active" | "inactive";
          membership_level:
            | "blue"
            | "silver"
            | "gold"
            | "platinum"
            | "black"
            | "none";
          membership_points?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          status?: "active" | "inactive";
          membership_level?:
            | "blue"
            | "silver"
            | "gold"
            | "platinum"
            | "black"
            | "none";
          membership_points?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      passenger_flights: {
        Row: {
          id: string;
          passenger_id: string;
          flight_id: string;
          seat: string | null;
          status:
            | "booked"
            | "checked-in"
            | "boarded"
            | "completed"
            | "cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          passenger_id: string;
          flight_id: string;
          seat?: string | null;
          status:
            | "booked"
            | "checked-in"
            | "boarded"
            | "completed"
            | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          passenger_id?: string;
          flight_id?: string;
          seat?: string | null;
          status?:
            | "booked"
            | "checked-in"
            | "boarded"
            | "completed"
            | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "passenger_flights_passenger_id_fkey";
            columns: ["passenger_id"];
            referencedRelation: "passengers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "passenger_flights_flight_id_fkey";
            columns: ["flight_id"];
            referencedRelation: "flights";
            referencedColumns: ["id"];
          },
        ];
      };
      crew_assignments: {
        Row: {
          id: string;
          crew_member_id: string;
          flight_id: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          crew_member_id: string;
          flight_id: string;
          role: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          crew_member_id?: string;
          flight_id?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "crew_assignments_crew_member_id_fkey";
            columns: ["crew_member_id"];
            referencedRelation: "crew_members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "crew_assignments_flight_id_fkey";
            columns: ["flight_id"];
            referencedRelation: "flights";
            referencedColumns: ["id"];
          },
        ];
      };
      routes: {
        Row: {
          id: string;
          origin: string;
          destination: string;
          distance: number;
          estimated_time: string;
          weather_condition: "good" | "moderate" | "poor";
          alternate_routes: number;
          fuel_consumption: number;
          status: "active" | "inactive" | "seasonal";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          origin: string;
          destination: string;
          distance: number;
          estimated_time: string;
          weather_condition: "good" | "moderate" | "poor";
          alternate_routes?: number;
          fuel_consumption: number;
          status: "active" | "inactive" | "seasonal";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          origin?: string;
          destination?: string;
          distance?: number;
          estimated_time?: string;
          weather_condition?: "good" | "moderate" | "poor";
          alternate_routes?: number;
          fuel_consumption?: number;
          status?: "active" | "inactive" | "seasonal";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      baggage: {
        Row: {
          id: string;
          passenger_flight_id: string;
          tracking_number: string;
          weight: number;
          status:
            | "checked-in"
            | "loaded"
            | "in-transit"
            | "arrived"
            | "claimed"
            | "lost";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          passenger_flight_id: string;
          tracking_number: string;
          weight: number;
          status:
            | "checked-in"
            | "loaded"
            | "in-transit"
            | "arrived"
            | "claimed"
            | "lost";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          passenger_flight_id?: string;
          tracking_number?: string;
          weight?: number;
          status?:
            | "checked-in"
            | "loaded"
            | "in-transit"
            | "arrived"
            | "claimed"
            | "lost";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "baggage_passenger_flight_id_fkey";
            columns: ["passenger_flight_id"];
            referencedRelation: "passenger_flights";
            referencedColumns: ["id"];
          },
        ];
      };
      operational_alerts: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: "maintenance" | "weather" | "crew" | "delay" | "other";
          severity: "low" | "medium" | "high" | "critical";
          status: "active" | "acknowledged" | "resolved";
          related_flight_id: string | null;
          related_aircraft_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: "maintenance" | "weather" | "crew" | "delay" | "other";
          severity: "low" | "medium" | "high" | "critical";
          status: "active" | "acknowledged" | "resolved";
          related_flight_id?: string | null;
          related_aircraft_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: "maintenance" | "weather" | "crew" | "delay" | "other";
          severity?: "low" | "medium" | "high" | "critical";
          status?: "active" | "acknowledged" | "resolved";
          related_flight_id?: string | null;
          related_aircraft_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "operational_alerts_related_flight_id_fkey";
            columns: ["related_flight_id"];
            referencedRelation: "flights";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "operational_alerts_related_aircraft_id_fkey";
            columns: ["related_aircraft_id"];
            referencedRelation: "aircraft";
            referencedColumns: ["id"];
          },
        ];
      };
      employees: {
        Row: {
          id: string;
          name: string;
          registration: string;
          department: string;
          position: string;
          salary: number;
          admission_date: string;
          status: 'ativo' | 'afastado' | 'desligado';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          registration: string;
          department: string;
          position: string;
          salary: number;
          admission_date: string;
          status: 'ativo' | 'afastado' | 'desligado';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          registration?: string;
          department?: string;
          position?: string;
          salary?: number;
          admission_date?: string;
          status?: 'ativo' | 'afastado' | 'desligado';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "employees_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ]
      };
      terminations: {
        Row: {
          id: string;
          employee_id: string;
          termination_date: string;
          reason: string;
          status: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
          salary_balance: number;
          vacation_balance: number;
          thirteenth_salary: number;
          notice_period: number;
          fgts_fine: number;
          other_benefits: number;
          deductions: number;
          total_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          termination_date: string;
          reason: string;
          status?: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
          salary_balance: number;
          vacation_balance: number;
          thirteenth_salary: number;
          notice_period: number;
          fgts_fine: number;
          other_benefits: number;
          deductions: number;
          total_amount: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          termination_date?: string;
          reason?: string;
          status?: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
          salary_balance?: number;
          vacation_balance?: number;
          thirteenth_salary?: number;
          notice_period?: number;
          fgts_fine?: number;
          other_benefits?: number;
          deductions?: number;
          total_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "terminations_employee_id_fkey";
            columns: ["employee_id"];
            referencedRelation: "employees";
            referencedColumns: ["id"];
          }
        ]
      };
      leaves: {
        Row: {
          id: string;
          employee_id: string;
          type: 'acidente_trabalho' | 'doenca' | 'maternidade' | 'paternidade' | 'ferias' | 'outros';
          start_date: string;
          end_date: string;
          status: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
          daily_amount: number;
          total_amount: number;
          medical_certificate: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          type: 'acidente_trabalho' | 'doenca' | 'maternidade' | 'paternidade' | 'ferias' | 'outros';
          start_date: string;
          end_date: string;
          status?: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
          daily_amount: number;
          total_amount: number;
          medical_certificate?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          type?: 'acidente_trabalho' | 'doenca' | 'maternidade' | 'paternidade' | 'ferias' | 'outros';
          start_date?: string;
          end_date?: string;
          status?: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
          daily_amount?: number;
          total_amount?: number;
          medical_certificate?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leaves_employee_id_fkey";
            columns: ["employee_id"];
            referencedRelation: "employees";
            referencedColumns: ["id"];
          }
        ]
      };
      documents: {
        Row: {
          id: string;
          process_id: string;
          process_type: 'termination' | 'leave';
          name: string;
          type: string;
          url: string;
          uploaded_at: string;
          status: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
        };
        Insert: {
          id?: string;
          process_id: string;
          process_type: 'termination' | 'leave';
          name: string;
          type: string;
          url: string;
          uploaded_at?: string;
          status?: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
        };
        Update: {
          id?: string;
          process_id?: string;
          process_type?: 'termination' | 'leave';
          name?: string;
          type?: string;
          url?: string;
          uploaded_at?: string;
          status?: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
        };
        Relationships: []
      };
      notifications: {
        Row: {
          id: string;
          employee_id: string;
          title: string;
          message: string;
          type: 'info' | 'success' | 'warning' | 'error';
          read: boolean;
          created_at: string;
          process_id: string | null;
          process_type: 'termination' | 'leave' | null;
        };
        Insert: {
          id?: string;
          employee_id: string;
          title: string;
          message: string;
          type: 'info' | 'success' | 'warning' | 'error';
          read?: boolean;
          created_at?: string;
          process_id?: string | null;
          process_type?: 'termination' | 'leave' | null;
        };
        Update: {
          id?: string;
          employee_id?: string;
          title?: string;
          message?: string;
          type?: 'info' | 'success' | 'warning' | 'error';
          read?: boolean;
          created_at?: string;
          process_id?: string | null;
          process_type?: 'termination' | 'leave' | null;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_employee_id_fkey";
            columns: ["employee_id"];
            referencedRelation: "employees";
            referencedColumns: ["id"];
          }
        ]
      };
      process_history: {
        Row: {
          id: string;
          employee_id: string;
          process_type: 'termination' | 'leave';
          process_id: string;
          action: string;
          status: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
          details: string;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          process_type: 'termination' | 'leave';
          process_id: string;
          action: string;
          status: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
          details: string;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          process_type?: 'termination' | 'leave';
          process_id?: string;
          action?: string;
          status?: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';
          details?: string;
          created_at?: string;
          created_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "process_history_employee_id_fkey";
            columns: ["employee_id"];
            referencedRelation: "employees";
            referencedColumns: ["id"];
          }
        ]
      }
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
