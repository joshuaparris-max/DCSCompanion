

import type { Borrower } from './types';


const BORROWERS_KEY = 'dcs-borrowers';
// const LOANS_KEY = 'dcs-loans';

export function loadBorrowers(): Borrower[] {
  const raw = localStorage.getItem(BORROWERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Borrower[];
  } catch {
    return [];
  }
}

export function saveBorrowers(borrowers: Borrower[]): void {
  localStorage.setItem(BORROWERS_KEY, JSON.stringify(borrowers));
}

export function checkoutResource({ barcode, borrowerCode, loanPeriodDays }: { barcode: string; borrowerCode: string; loanPeriodDays: number }): { success: boolean; message: string } {
  // Placeholder logic for checking out a resource
  void barcode; void borrowerCode; void loanPeriodDays;
  return { success: true, message: 'Checked out' };
}

export function returnResource(barcode: string): { success: boolean; message: string } {
  // Placeholder logic for returning a resource
  void barcode;
  return { success: true, message: 'Returned' };
}
