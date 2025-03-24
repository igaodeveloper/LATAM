import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'
import { Employee, Termination, Leave, Document, Notification, ProcessHistory, CalculationParameters } from '../types/hr'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export class HRService {
  // Employee Management
  async getEmployee(id: string): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async getEmployees(): Promise<Employee[]> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  }

  async createEmployee(employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>): Promise<Employee> {
    const { data, error } = await supabase
      .from('employees')
      .insert(employee)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
    const { data, error } = await supabase
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
      .from('terminations')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async getEmployeeTerminations(employeeId: string): Promise<Termination[]> {
    const { data, error } = await supabase
      .from('terminations')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async createTermination(termination: Omit<Termination, 'id' | 'created_at' | 'updated_at'>): Promise<Termination> {
    const { data, error } = await supabase
      .from('terminations')
      .insert(termination)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateTerminationStatus(id: string, status: Termination['status']): Promise<Termination> {
    const { data, error } = await supabase
      .from('terminations')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Leave Management
  async getLeave(id: string): Promise<Leave | null> {
    const { data, error } = await supabase
      .from('leaves')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  async getEmployeeLeaves(employeeId: string): Promise<Leave[]> {
    const { data, error } = await supabase
      .from('leaves')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async createLeave(leave: Omit<Leave, 'id' | 'created_at' | 'updated_at'>): Promise<Leave> {
    const { data, error } = await supabase
      .from('leaves')
      .insert(leave)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateLeaveStatus(id: string, status: Leave['status']): Promise<Leave> {
    const { data, error } = await supabase
      .from('leaves')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Document Management
  async uploadDocument(document: Omit<Document, 'id' | 'uploaded_at'>): Promise<Document> {
    const { data, error } = await supabase
      .from('documents')
      .insert(document)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getProcessDocuments(processId: string, processType: Document['process_type']): Promise<Document[]> {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getEmployeeNotifications(employeeId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  async markNotificationAsRead(id: string): Promise<Notification> {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
      .from('process_history')
      .insert(history)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getProcessHistory(processId: string, processType: ProcessHistory['process_type']): Promise<ProcessHistory[]> {
    const { data, error } = await supabase
      .from('process_history')
      .select('*')
      .eq('process_id', processId)
      .eq('process_type', processType)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  }

  // Calculation Methods
  calculateTerminationAmounts(params: CalculationParameters): {
    salary_balance: number
    vacation_balance: number
    thirteenth_salary: number
    notice_period: number
    fgts_fine: number
    other_benefits: number
    deductions: number
    total_amount: number
  } {
    const {
      salary,
      termination_date,
      last_vacation_date,
      last_thirteenth_salary_date,
      notice_period_days,
      has_fgts_fine,
      other_benefits_amount,
      deductions_amount
    } = params

    // Calculate salary balance
    const daysInMonth = new Date(termination_date.getFullYear(), termination_date.getMonth() + 1, 0).getDate()
    const daysWorked = termination_date.getDate()
    const salary_balance = (salary / daysInMonth) * daysWorked

    // Calculate vacation balance
    const vacation_days = 30 // Assuming 30 days of vacation per year
    const monthsSinceLastVacation = this.getMonthsDifference(last_vacation_date, termination_date)
    const vacation_balance = (salary / 3) * (monthsSinceLastVacation / 12) * vacation_days

    // Calculate thirteenth salary
    const monthsSinceLastThirteenth = this.getMonthsDifference(last_thirteenth_salary_date, termination_date)
    const thirteenth_salary = (salary / 12) * monthsSinceLastThirteenth

    // Calculate notice period
    const notice_period = (salary / 30) * notice_period_days

    // Calculate FGTS fine (40% of FGTS balance)
    const fgts_fine = has_fgts_fine ? salary * 0.08 * 0.4 : 0

    // Calculate total
    const total_amount = salary_balance +
      vacation_balance +
      thirteenth_salary +
      notice_period +
      fgts_fine +
      other_benefits_amount -
      deductions_amount

    return {
      salary_balance,
      vacation_balance,
      thirteenth_salary,
      notice_period,
      fgts_fine,
      other_benefits: other_benefits_amount,
      deductions: deductions_amount,
      total_amount
    }
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
    return (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() - startDate.getMonth()
  }

  private getDaysDifference(startDate: Date, endDate: Date): number {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
} 