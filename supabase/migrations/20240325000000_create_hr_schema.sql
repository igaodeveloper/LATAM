-- Create HR schema
CREATE SCHEMA IF NOT EXISTS hr;

-- Create enum types
CREATE TYPE hr.leave_type AS ENUM (
  'acidente_trabalho',
  'doenca',
  'maternidade',
  'paternidade',
  'ferias',
  'outros'
);

CREATE TYPE hr.process_status AS ENUM (
  'pendente',
  'aprovado',
  'rejeitado',
  'em_analise',
  'finalizado'
);

-- Create employees table
CREATE TABLE hr.employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  registration TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  position TEXT NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  admission_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ativo', 'afastado', 'desligado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create terminations table
CREATE TABLE hr.terminations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES hr.employees(id),
  termination_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status hr.process_status NOT NULL DEFAULT 'pendente',
  salary_balance DECIMAL(10,2) NOT NULL,
  vacation_balance DECIMAL(10,2) NOT NULL,
  thirteenth_salary DECIMAL(10,2) NOT NULL,
  notice_period DECIMAL(10,2) NOT NULL,
  fgts_fine DECIMAL(10,2) NOT NULL,
  other_benefits DECIMAL(10,2) NOT NULL,
  deductions DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaves table
CREATE TABLE hr.leaves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES hr.employees(id),
  type hr.leave_type NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status hr.process_status NOT NULL DEFAULT 'pendente',
  daily_amount DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  medical_certificate TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE hr.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  process_id UUID NOT NULL,
  process_type TEXT NOT NULL CHECK (process_type IN ('termination', 'leave')),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status hr.process_status NOT NULL DEFAULT 'pendente'
);

-- Create notifications table
CREATE TABLE hr.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES hr.employees(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  process_id UUID,
  process_type TEXT CHECK (process_type IN ('termination', 'leave'))
);

-- Create process history table
CREATE TABLE hr.process_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES hr.employees(id),
  process_type TEXT NOT NULL CHECK (process_type IN ('termination', 'leave')),
  process_id UUID NOT NULL,
  action TEXT NOT NULL,
  status hr.process_status NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT NOT NULL
);

-- Create indexes
CREATE INDEX idx_employees_registration ON hr.employees(registration);
CREATE INDEX idx_terminations_employee_id ON hr.terminations(employee_id);
CREATE INDEX idx_leaves_employee_id ON hr.leaves(employee_id);
CREATE INDEX idx_documents_process_id ON hr.documents(process_id);
CREATE INDEX idx_notifications_employee_id ON hr.notifications(employee_id);
CREATE INDEX idx_process_history_employee_id ON hr.process_history(employee_id);

-- Create RLS policies
ALTER TABLE hr.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr.terminations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr.leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr.process_history ENABLE ROW LEVEL SECURITY;

-- Employees policies
CREATE POLICY "Employees can view their own data"
  ON hr.employees FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "HR can manage all employees"
  ON hr.employees FOR ALL
  USING (auth.uid() IN (SELECT id FROM hr.employees WHERE department = 'HR'));

-- Terminations policies
CREATE POLICY "Employees can view their own terminations"
  ON hr.terminations FOR SELECT
  USING (auth.uid() = employee_id);

CREATE POLICY "HR can manage all terminations"
  ON hr.terminations FOR ALL
  USING (auth.uid() IN (SELECT id FROM hr.employees WHERE department = 'HR'));

-- Leaves policies
CREATE POLICY "Employees can view their own leaves"
  ON hr.leaves FOR SELECT
  USING (auth.uid() = employee_id);

CREATE POLICY "HR can manage all leaves"
  ON hr.leaves FOR ALL
  USING (auth.uid() IN (SELECT id FROM hr.employees WHERE department = 'HR'));

-- Documents policies
CREATE POLICY "Employees can view their own documents"
  ON hr.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM hr.terminations t
      WHERE t.id = process_id AND t.employee_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM hr.leaves l
      WHERE l.id = process_id AND l.employee_id = auth.uid()
    )
  );

CREATE POLICY "HR can manage all documents"
  ON hr.documents FOR ALL
  USING (auth.uid() IN (SELECT id FROM hr.employees WHERE department = 'HR'));

-- Notifications policies
CREATE POLICY "Employees can view their own notifications"
  ON hr.notifications FOR SELECT
  USING (auth.uid() = employee_id);

CREATE POLICY "HR can manage all notifications"
  ON hr.notifications FOR ALL
  USING (auth.uid() IN (SELECT id FROM hr.employees WHERE department = 'HR'));

-- Process history policies
CREATE POLICY "Employees can view their own process history"
  ON hr.process_history FOR SELECT
  USING (auth.uid() = employee_id);

CREATE POLICY "HR can manage all process history"
  ON hr.process_history FOR ALL
  USING (auth.uid() IN (SELECT id FROM hr.employees WHERE department = 'HR'));

-- Create functions
CREATE OR REPLACE FUNCTION hr.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON hr.employees
  FOR EACH ROW
  EXECUTE FUNCTION hr.update_updated_at();

CREATE TRIGGER update_terminations_updated_at
  BEFORE UPDATE ON hr.terminations
  FOR EACH ROW
  EXECUTE FUNCTION hr.update_updated_at();

CREATE TRIGGER update_leaves_updated_at
  BEFORE UPDATE ON hr.leaves
  FOR EACH ROW
  EXECUTE FUNCTION hr.update_updated_at(); 