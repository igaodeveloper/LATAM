import { supabase } from '@/lib/supabase';
import { calculationService } from './calculationService';
import {
  Employee,
  Termination,
  Leave,
  Document,
  Notification,
  ProcessHistory,
  ProcessStatus,
  LeaveType,
} from '@/types/hr';

export const hrService = {
  // Employee Management
  async getEmployee(id: string): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Termination Management
  async createTermination(employeeId: string, terminationDate: string, reason: string): Promise<Termination> {
    const employee = await this.getEmployee(employeeId);
    if (!employee) throw new Error('Funcionário não encontrado');

    const calculations = calculationService.calculateTermination({
      salary: employee.salary,
      admission_date: employee.admission_date,
      termination_date: terminationDate,
    });

    const { data, error } = await supabase
      .from('terminations')
      .insert({
        employee_id: employeeId,
        termination_date: terminationDate,
        reason,
        status: 'pendente',
        ...calculations,
      })
      .select()
      .single();

    if (error) throw error;

    // Create notification
    await this.createNotification({
      employee_id: employeeId,
      title: 'Nova Rescisão',
      message: 'Uma nova rescisão foi criada para análise.',
      type: 'info',
    });

    // Create process history
    await this.createProcessHistory({
      employee_id: employeeId,
      process_type: 'termination',
      process_id: data.id,
      action: 'criacao',
      status: 'pendente',
      details: 'Rescisão criada para análise',
      created_by: 'system',
    });

    return {
      ...data,
      documents: []
    };
  },

  async updateTerminationStatus(id: string, status: ProcessStatus): Promise<Termination> {
    const { data, error } = await supabase
      .from('terminations')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Create notification
    await this.createNotification({
      employee_id: data.employee_id,
      title: 'Status da Rescisão Atualizado',
      message: `O status da sua rescisão foi atualizado para ${status}.`,
      type: status === 'aprovado' ? 'success' : 'info',
      process_id: id,
      process_type: 'termination',
    });

    // Create process history
    await this.createProcessHistory({
      employee_id: data.employee_id,
      process_type: 'termination',
      process_id: id,
      action: 'atualizacao',
      status,
      details: `Status da rescisão atualizado para ${status}`,
      created_by: 'system',
    });

    return {
      ...data,
      documents: []
    };
  },

  // Leave Management
  async createLeave(
    employeeId: string,
    type: LeaveType,
    startDate: string,
    endDate: string,
    medicalCertificate?: string
  ): Promise<Leave> {
    const employee = await this.getEmployee(employeeId);
    if (!employee) throw new Error('Funcionário não encontrado');

    const calculations = calculationService.calculateLeave({
      salary: employee.salary,
      leave_start_date: startDate,
      leave_end_date: endDate,
      leave_type: type,
      has_medical_certificate: !!medicalCertificate,
      admission_date: ''
    });

    const { data, error } = await supabase
      .from('leaves')
      .insert({
        employee_id: employeeId,
        type,
        start_date: startDate,
        end_date: endDate,
        status: 'pendente',
        medical_certificate: medicalCertificate,
        ...calculations,
      })
      .select()
      .single();

    if (error) throw error;

    // Create notification
    await this.createNotification({
      employee_id: employeeId,
      title: 'Novo Afastamento',
      message: 'Um novo afastamento foi criado para análise.',
      type: 'info',
    });

    // Create process history
    await this.createProcessHistory({
      employee_id: employeeId,
      process_type: 'leave',
      process_id: data.id,
      action: 'criacao',
      status: 'pendente',
      details: 'Afastamento criado para análise',
      created_by: 'system',
    });

    return {
      ...data,
      documents: []
    };
  },

  async updateLeaveStatus(id: string, status: ProcessStatus): Promise<Leave> {
    const { data, error } = await supabase
      .from('leaves')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Create notification
    await this.createNotification({
      employee_id: data.employee_id,
      title: 'Status do Afastamento Atualizado',
      message: `O status do seu afastamento foi atualizado para ${status}.`,
      type: status === 'aprovado' ? 'success' : 'info',
      process_id: id,
      process_type: 'leave',
    });

    // Create process history
    await this.createProcessHistory({
      employee_id: data.employee_id,
      process_type: 'leave',
      process_id: id,
      action: 'atualizacao',
      status,
      details: `Status do afastamento atualizado para ${status}`,
      created_by: 'system',
    });

    return {
      ...data,
      documents: []
    };
  },

  // Document Management
  async uploadDocument(
    processId: string,
    processType: 'termination' | 'leave',
    file: File
  ): Promise<Document> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${processId}-${Date.now()}.${fileExt}`;
    const filePath = `${processType}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('hr-documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('hr-documents')
      .getPublicUrl(filePath);

    const { data, error } = await supabase
      .from('documents')
      .insert({
        process_id: processId,
        process_type: processType,
        name: file.name,
        type: file.type,
        url: publicUrl,
        status: 'pendente',
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  // Notification Management
  async createNotification(notification: Omit<Notification, 'id' | 'created_at'>): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async getEmployeeNotifications(employeeId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  },

  async markNotificationAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) throw error;
  },

  // Process History
  async createProcessHistory(history: Omit<ProcessHistory, 'id' | 'created_at'>): Promise<ProcessHistory> {
    const { data, error } = await supabase
      .from('process_history')
      .insert(history)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async getEmployeeProcessHistory(employeeId: string): Promise<ProcessHistory[]> {
    const { data, error } = await supabase
      .from('process_history')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  },

  // Dashboard Data
  async getEmployeeDashboard(employeeId: string) {
    const [employee, notifications, processHistory] = await Promise.all([
      this.getEmployee(employeeId),
      this.getEmployeeNotifications(employeeId),
      this.getEmployeeProcessHistory(employeeId),
    ]);

    const activeProcesses = processHistory.filter(
      process => process.status === 'pendente' || process.status === 'em_analise'
    );

    return {
      employee,
      notifications: notifications.filter(n => !n.read),
      activeProcesses,
      recentHistory: processHistory.slice(0, 5),
    };
  },
}; 