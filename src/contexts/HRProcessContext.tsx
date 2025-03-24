import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface Process {
  id: string;
  type: 'rescisao' | 'afastamento';
  status: 'pendente' | 'em_andamento' | 'concluido' | 'cancelado';
  date: string;
  value: number;
  details: {
    startDate?: string;
    endDate?: string;
    reason?: string;
    documents?: string[];
  };
}

interface HRProcessContextType {
  notifications: Notification[];
  processes: Process[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  addProcess: (process: Omit<Process, 'id'>) => void;
  updateProcess: (id: string, updates: Partial<Process>) => void;
  getProcessById: (id: string) => Process | undefined;
  getProcessesByType: (type: Process['type']) => Process[];
  getProcessesByStatus: (status: Process['status']) => Process[];
}

const HRProcessContext = createContext<HRProcessContextType | undefined>(undefined);

export const HRProcessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const addProcess = (process: Omit<Process, 'id'>) => {
    const newProcess = {
      ...process,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProcesses(prev => [...prev, newProcess]);
  };

  const updateProcess = (id: string, updates: Partial<Process>) => {
    setProcesses(prev =>
      prev.map(process =>
        process.id === id ? { ...process, ...updates } : process
      )
    );
  };

  const getProcessById = (id: string) => {
    return processes.find(process => process.id === id);
  };

  const getProcessesByType = (type: Process['type']) => {
    return processes.filter(process => process.type === type);
  };

  const getProcessesByStatus = (status: Process['status']) => {
    return processes.filter(process => process.status === status);
  };

  return (
    <HRProcessContext.Provider
      value={{
        notifications,
        processes,
        addNotification,
        removeNotification,
        addProcess,
        updateProcess,
        getProcessById,
        getProcessesByType,
        getProcessesByStatus,
      }}
    >
      {children}
    </HRProcessContext.Provider>
  );
};

export const useHRProcess = () => {
  const context = useContext(HRProcessContext);
  if (context === undefined) {
    throw new Error('useHRProcess must be used within a HRProcessProvider');
  }
  return context;
}; 