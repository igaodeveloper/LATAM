import { CalculationParameters, LeaveType } from '@/types/hr';

export const calculationService = {
  calculateTermination(params: CalculationParameters) {
    const {
      salary,
      admission_date,
      termination_date,
    } = params;

    if (!termination_date) {
      throw new Error('Data de rescisão é obrigatória');
    }

    const admission = new Date(admission_date);
    const termination = new Date(termination_date);
    const today = new Date();

    // Calculate working days in the month
    const daysInMonth = new Date(termination.getFullYear(), termination.getMonth() + 1, 0).getDate();
    const workedDays = termination.getDate();
    const salaryBalance = (salary / daysInMonth) * workedDays;

    // Calculate proportional vacation
    const monthsWorked = this.calculateMonthsBetween(admission, termination);
    const vacationDays = monthsWorked * 2.5; // 30 days per year
    const vacationBalance = (salary / 30) * vacationDays;

    // Calculate proportional 13th salary
    const thirteenthSalary = (salary / 12) * monthsWorked;

    // Calculate notice period (30 days)
    const noticePeriod = salary;

    // Calculate FGTS fine (40% of FGTS balance)
    const fgtsBalance = salary * 0.08 * monthsWorked; // 8% of salary per month
    const fgtsFine = fgtsBalance * 0.4;

    // Other benefits (example: health insurance, transportation)
    const otherBenefits = salary * 0.1; // 10% of salary

    // Deductions (INSS, IR)
    const inss = this.calculateINSS(salary);
    const ir = this.calculateIR(salary - inss);
    const deductions = inss + ir;

    const totalAmount = salaryBalance + vacationBalance + thirteenthSalary + 
                       noticePeriod + fgtsFine + otherBenefits - deductions;

    return {
      salary_balance: salaryBalance,
      vacation_balance: vacationBalance,
      thirteenth_salary: thirteenthSalary,
      notice_period: noticePeriod,
      fgts_fine: fgtsFine,
      other_benefits: otherBenefits,
      deductions: deductions,
      total_amount: totalAmount,
    };
  },

  calculateLeave(params: CalculationParameters) {
    const {
      salary,
      leave_start_date,
      leave_end_date,
      leave_type,
      has_medical_certificate,
    } = params;

    if (!leave_start_date || !leave_end_date || !leave_type) {
      throw new Error('Data inicial, data final e tipo de afastamento são obrigatórios');
    }

    const start = new Date(leave_start_date);
    const end = new Date(leave_end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    let dailyAmount = 0;
    let totalAmount = 0;

    switch (leave_type) {
      case 'acidente_trabalho':
        dailyAmount = salary / 30; // 100% of daily salary
        break;
      case 'doenca':
        if (has_medical_certificate) {
          dailyAmount = salary / 30; // 100% of daily salary
        } else {
          dailyAmount = (salary / 30) * 0.5; // 50% of daily salary
        }
        break;
      case 'maternidade':
        dailyAmount = salary / 30; // 100% of daily salary
        break;
      case 'paternidade':
        dailyAmount = salary / 30; // 100% of daily salary
        break;
      case 'ferias':
        dailyAmount = (salary / 30) * 1.33; // 133% of daily salary
        break;
      default:
        dailyAmount = salary / 30; // Default to 100% of daily salary
    }

    totalAmount = dailyAmount * days;

    return {
      daily_amount: dailyAmount,
      total_amount: totalAmount,
      days: days,
    };
  },

  calculateMonthsBetween(date1: Date, date2: Date): number {
    const yearDiff = date2.getFullYear() - date1.getFullYear();
    const monthDiff = date2.getMonth() - date1.getMonth();
    return yearDiff * 12 + monthDiff;
  },

  calculateINSS(salary: number): number {
    const inssTable = [
      { limit: 1320, rate: 0.075 },
      { limit: 2571.29, rate: 0.09 },
      { limit: 3856.94, rate: 0.12 },
      { limit: 7507.49, rate: 0.14 },
    ];

    let inss = 0;
    let remainingSalary = salary;

    for (const bracket of inssTable) {
      if (remainingSalary <= 0) break;
      
      const taxableAmount = Math.min(remainingSalary, bracket.limit);
      inss += taxableAmount * bracket.rate;
      remainingSalary -= taxableAmount;
    }

    return inss;
  },

  calculateIR(baseSalary: number): number {
    const irTable = [
      { limit: 1903.98, rate: 0, deduction: 0 },
      { limit: 2826.65, rate: 0.075, deduction: 142.80 },
      { limit: 3751.05, rate: 0.15, deduction: 354.80 },
      { limit: 4664.68, rate: 0.225, deduction: 636.13 },
      { limit: Infinity, rate: 0.275, deduction: 869.36 },
    ];

    for (const bracket of irTable) {
      if (baseSalary <= bracket.limit) {
        return baseSalary * bracket.rate - bracket.deduction;
      }
    }

    return 0;
  },
}; 