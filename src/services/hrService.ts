import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'
import { Employee, Termination, Leave, Document, Notification, ProcessHistory, CalculationParameters } from '../types/hr'
import { supabase } from "@/lib/supabase";

const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export class HRService {
  // Employee Management
  async getEmployee(id: string): Promise<Employee | null> {
    const { data, error } = await supabaseClient
      .from('employees')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async getEmployees(): Promise<Employee[]> {
    const { data, error } = await supabaseClient
      .from('employees')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  }

  async createEmployee(employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>): Promise<Employee> {
    const { data, error } = await supabaseClient
      .from('employees')
      .insert(employee)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
    const { data, error } = await supabaseClient
      .from('employees')
      .update(employee)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Termination Management
  async getTermination(id: string): Promise<Termination | null> {
    const { data, error } = await supabase
      .from("terminations")
      .select("*, documents(*)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching termination:", error);
      return null;
    }

    return data as Termination;
  }

  async getTerminations(): Promise<Termination[]> {
    // Implement actual database query here
    return [
      {
        id: "1",
        employee_id: "1",
        reason: "voluntary",
        termination_date: new Date(),
        notice_date: new Date(),
        status: "pending",
        documents: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as unknown as Termination,
    ];
  }

  async getEmployeeTerminations(employeeId: string): Promise<Termination[]> {
    const terminations = await this.getTerminations();
    return terminations.filter(termination => termination.employee_id === employeeId);
  }

  async createTermination(termination: Omit<Termination, "id" | "created_at" | "updated_at">): Promise<Termination | null> {
    const { data, error } = await supabase
      .from("terminations")
      .insert([termination])
      .select()
      .single();

    if (error) {
      console.error("Error creating termination:", error);
      return null;
    }

    return data as Termination;
  }

  async updateTermination(id: string, termination: Partial<Termination>): Promise<Termination | null> {
    // Implement actual database update here
    
    return {
      id,
      ...termination,
      employee_id: termination.employee_id || "1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Termination;
  }

  async updateTerminationStatus(id: string, status: Termination['status']): Promise<Termination | null> {
    return this.updateTermination(id, { status });
  }

  // Leave Management
  async getLeave(id: string): Promise<Leave | null> {
    const { data, error } = await supabase
      .from("leaves")
      .select("*, documents(*)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching leave:", error);
      return null;
    }

    return data as Leave;
  }

  async getLeaves(): Promise<Leave[]> {
    // Implement actual database query here
    return [
      {
        id: "1",
        employee_id: "1",
        type: "vacation",
        start_date: new Date(),
        end_date: new Date(),
        status: "approved",
        notes: "Annual leave",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as unknown as Leave,
    ];
  }

  async getEmployeeLeaves(employeeId: string): Promise<Leave[]> {
    const leaves = await this.getLeaves();
    return leaves.filter(leave => leave.employee_id === employeeId);
  }

  async createLeave(leave: Omit<Leave, "id" | "created_at" | "updated_at">): Promise<Leave | null> {
    const { data, error } = await supabase
      .from("leaves")
      .insert([leave])
      .select()
      .single();

    if (error) {
      console.error("Error creating leave:", error);
      return null;
    }

    return data as Leave;
  }

  async updateLeave(id: string, leave: Partial<Leave>): Promise<Leave | null> {
    // Implement actual database update here
    
    return {
      id,
      ...leave,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Leave;
  }

  async updateLeaveStatus(id: string, status: Leave['status']): Promise<Leave | null> {
    return this.updateLeave(id, { status });
  }

  // Document Management
  async uploadDocument(document: Omit<Document, 'id' | 'uploaded_at'>): Promise<Document> {
    const { data, error } = await supabaseClient
      .from('documents')
      .insert(document)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getProcessDocuments(processId: string, processType: Document['process_type']): Promise<Document[]> {
    const { data, error } = await supabaseClient
      .from('documents')
      .select('*')
      .eq('process_id', processId)
      .eq('process_type', processType)
      .order('uploaded_at', { ascending: false })

    if (error) throw error
    return data
  }

  // Notification Management
  async createNotification(notification: Omit<Notification, 'id' | 'created_at'>): Promise<Notification> {
    const { data, error } = await supabaseClient
      .from('notifications')
      .insert(notification)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getEmployeeNotifications(employeeId: string): Promise<Notification[]> {
    const { data, error } = await supabaseClient
      .from('notifications')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async markNotificationAsRead(id: string): Promise<Notification> {
    const { data, error } = await supabaseClient
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Process History Management
  async createProcessHistory(history: Omit<ProcessHistory, 'id' | 'created_at'>): Promise<ProcessHistory> {
    const { data, error } = await supabaseClient
      .from('process_history')
      .insert(history)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getProcessHistory(processId: string, processType: ProcessHistory['process_type']): Promise<ProcessHistory[]> {
    const { data, error } = await supabaseClient
      .from('process_history')
      .select('*')
      .eq('process_id', processId)
      .eq('process_type', processType)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  }

  // Calculation Methods
  calculateTerminationValues(params: CalculationParameters): {
    salary: number;
    vacation: number;
    thirteenth: number;
    fgts: number;
    fgtsFine: number;
    otherBenefits: number;
    deductions: number;
    total: number;
  } {
    const {
      base_salary,
      months_worked,
      vacation_days,
      notice_period,
      has_fgts_penalty,
      other_benefits,
      deductions,
      termination_date,
      last_vacation_date,
      last_thirteenth_date
    } = params;

    // Calculate proportional salary
    const daysInMonth = new Date(termination_date.getFullYear(), termination_date.getMonth() + 1, 0).getDate();
    const daysWorked = termination_date.getDate();
    const proportionalSalary = (base_salary / daysInMonth) * daysWorked;

    // Calculate vacation
    const monthsSinceLastVacation = last_vacation_date
      ? this.getMonthsDifference(last_vacation_date, termination_date)
      : months_worked;
    const proportionalVacation = (base_salary / 12) * monthsSinceLastVacation;
    const vacationBonus = proportionalVacation / 3;
    const totalVacation = proportionalVacation + vacationBonus;

    // Calculate 13th salary
    const monthsSinceLastThirteenth = last_thirteenth_date
      ? this.getMonthsDifference(last_thirteenth_date, termination_date)
      : months_worked;
    const thirteenthSalary = (base_salary / 12) * monthsSinceLastThirteenth;

    // Calculate FGTS
    const fgtsMonthly = base_salary * 0.08;
    const fgtsTotal = fgtsMonthly * months_worked;
    const fgtsFine = has_fgts_penalty ? fgtsTotal * 0.4 : 0;

    // Calculate total
    const total =
      proportionalSalary +
      totalVacation +
      thirteenthSalary +
      fgtsTotal +
      fgtsFine +
      other_benefits -
      deductions;

    return {
      salary: proportionalSalary,
      vacation: totalVacation,
      thirteenth: thirteenthSalary,
      fgts: fgtsTotal,
      fgtsFine,
      otherBenefits: other_benefits,
      deductions,
      total,
    };
  }

  calculateLeaveAmounts(params: {
    salary: number
    start_date: Date
    end_date: Date
    type: Leave['type']
  }): {
    daily_amount: number
    total_amount: number
  } {
    const { salary, start_date, end_date, type } = params

    // Calculate daily amount based on leave type
    let daily_amount = salary / 30 // Default to monthly salary divided by 30

    switch (type) {
      case 'acidente_trabalho':
        daily_amount = salary / 30 // 100% of salary
        break
      case 'doenca':
        daily_amount = salary / 30 // 100% of salary
        break
      case 'maternidade':
        daily_amount = salary / 30 // 100% of salary
        break
      case 'paternidade':
        daily_amount = salary / 30 // 100% of salary
        break
      case 'ferias':
        daily_amount = (salary / 3) / 30 // Salary + 1/3
        break
      default:
        daily_amount = salary / 30
    }

    // Calculate total amount
    const days = this.getDaysDifference(start_date, end_date)
    const total_amount = daily_amount * days

    return {
      daily_amount,
      total_amount
    }
  }

  // Helper Methods
  private getMonthsDifference(startDate: Date, endDate: Date): number {
    return (
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() -
      startDate.getMonth()
    );
  }

  private getDaysDifference(startDate: Date, endDate: Date): number {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
} 