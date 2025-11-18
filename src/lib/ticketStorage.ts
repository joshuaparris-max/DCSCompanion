

import type { Ticket } from './types';


const TICKETS_KEY = 'dcs-tickets';

export function loadTickets(): Ticket[] {
  const raw = localStorage.getItem(TICKETS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Ticket[];
  } catch {
    return [];
  }
}

export function saveTickets(tickets: Ticket[]): void {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function addTicket(ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): void {
  const tickets = loadTickets();
  const now = new Date().toISOString();
  const newTicket: Ticket = {
    ...ticket,
    id: Math.random().toString(36).slice(2),
    createdAt: now,
    updatedAt: now,
  };
  tickets.push(newTicket);
  saveTickets(tickets);
}

export function updateTicket(id: string, updater: (t: Ticket) => Ticket): void {
  const tickets = loadTickets();
  const idx = tickets.findIndex(t => t.id === id);
  if (idx === -1) return;
  tickets[idx] = { ...updater(tickets[idx]), updatedAt: new Date().toISOString() };
  saveTickets(tickets);
}
