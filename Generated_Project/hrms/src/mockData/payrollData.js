// Mock payroll data
// This module exports an array of payroll history records used for simulating API responses.
// Each record contains: id, month, baseSalary, bonuses, deductions, netPay.

/**
 * @typedef {Object} PayrollRecord
 * @property {number} id - Unique identifier for the payroll entry.
 * @property {string} month - Month and year of the payroll (e.g., 'Jan 2024').
 * @property {number} baseSalary - Base salary amount for the month.
 * @property {number} bonuses - Bonus amount added for the month.
 * @property {number} deductions - Deductions applied for the month.
 * @property {number} netPay - Net pay after adding bonuses and subtracting deductions.
 */

/**
 * Sample payroll history for the last six months.
 * @type {PayrollRecord[]}
 */
export const payrollHistory = [
  {
    id: 1,
    month: 'Oct 2023',
    baseSalary: 5000,
    bonuses: 250,
    deductions: 150,
    netPay: 5100,
  },
  {
    id: 2,
    month: 'Nov 2023',
    baseSalary: 5000,
    bonuses: 300,
    deductions: 200,
    netPay: 5100,
  },
  {
    id: 3,
    month: 'Dec 2023',
    baseSalary: 5000,
    bonuses: 400,
    deductions: 250,
    netPay: 5150,
  },
  {
    id: 4,
    month: 'Jan 2024',
    baseSalary: 5000,
    bonuses: 350,
    deductions: 180,
    netPay: 5170,
  },
  {
    id: 5,
    month: 'Feb 2024',
    baseSalary: 5000,
    bonuses: 200,
    deductions: 120,
    netPay: 5080,
  },
  {
    id: 6,
    month: 'Mar 2024',
    baseSalary: 5000,
    bonuses: 500,
    deductions: 300,
    netPay: 5200,
  },
];
