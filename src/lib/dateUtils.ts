/**
 * Returns true if two dates are the same day (ignores time)
 */
export function isSameDay(a: string | Date, b: string | Date): boolean {
  const d1 = typeof a === 'string' ? new Date(a) : a;
  const d2 = typeof b === 'string' ? new Date(b) : b;
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

/**
 * Returns true if date is strictly before today
 */
export function isPast(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0,0,0,0);
  return d < today;
}

/**
 * Formats a date as YYYY-MM-DD
 */
export function formatShort(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().slice(0,10);
}

/**
 * Returns today's date
 */
export function today(): Date {
  const d = new Date();
  d.setHours(0,0,0,0);
  return d;
}
