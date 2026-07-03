import type { Ticket } from '../../../lib/types';
import { useState, useEffect } from 'react';
import { loadTickets } from '../../../lib/ticketStorage';

/**
 * Hook to load and manage tickets state
 */
export function useTickets(): [Ticket[], React.Dispatch<React.SetStateAction<Ticket[]>>] {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    setTickets(loadTickets());
  }, []);
  return [tickets, setTickets];
}
