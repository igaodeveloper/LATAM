export type LeaveType = 'acidente_trabalho' | 'doenca' | 'maternidade' | 'paternidade' | 'ferias';

export type ProcessStatus = 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise' | 'finalizado';

export interface Employee {
  id: string;
  name: string;
  registration: string;
  department: string;
  position: string;
  salary: number;
  admission_date: string;
  status: 'ativo' | 'afastado' | 'desligado';
}

export interface Termination {
  id: string;
  employee_id: string;
  termination_date: string;
  reason: string;
  status: ProcessStatus;
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
  documents: Document[];
}

export interface Leave {
  id: string;
  employee_id: string;
  type: LeaveType;
  start_date: string;
  end_date: string;
  status: ProcessStatus;
  daily_amount: number;
  total_amount: number;
  medical_certificate?: string;
  created_at: string;
  updated_at: string;
  documents: Document[];
}

export interface Document {
  id: string;
  process_id: string;
  process_type: 'termination' | 'leave';
  name: string;
  type: string;
  url: string;
  uploaded_at: string;
  status: ProcessStatus;
}

export interface Notification {
  id: string;
  employee_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
  process_id?: string;
  process_type?: 'termination' | 'leave';
}

export interface ProcessHistory {
  id: string;
  employee_id: string;
  process_type: 'termination' | 'leave';
  process_id: string;
  action: string;
  status: ProcessStatus;
  details: string;
  created_at: string;
  created_by: string;
}

export interface CalculationParameters {
  salary: number;
  admission_date: string;
  termination_date?: string;
  leave_start_date?: string;
  leave_end_date?: string;
  leave_type?: LeaveType;
  has_medical_certificate?: boolean;
} 