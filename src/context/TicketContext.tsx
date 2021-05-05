import React, { createContext, useState } from 'react';

import { Ticket, TicketStatus } from '../domain/Ticket';

interface ITicketContext {
  tickets: Ticket[];
  submitTicket(ticket: Ticket): void;
  changeTicketState(ticketId: string, status: TicketStatus): void;
}

type StorageTicket = Ticket & { startDate: string; endDate: string };

export const TicketContext = createContext<ITicketContext>(
  {} as ITicketContext
);

const getTicketsFromStorage = (): StorageTicket[] =>
  JSON.parse(localStorage.getItem('tickets') ?? '[]');

export const TicketProvider: React.FC = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(getTicketsFromStorage());

  const submitTicket = (submitted: Ticket) => {
    const currentTickets: Ticket[] = JSON.parse(
      localStorage.getItem('tickets') ?? '[]'
    );

    const sprintIndex = currentTickets.findIndex(
      ({ id }) => id === submitted.id
    );

    if (sprintIndex !== -1) {
      currentTickets[sprintIndex] = submitted;
    } else {
      currentTickets.push({ ...submitted });
    }

    localStorage.setItem('tickets', JSON.stringify(currentTickets));
    setTickets(currentTickets);
  };

  const changeTicketState: ITicketContext['changeTicketState'] = (
    ticketId,
    status
  ) => {
    console.log('here?', ticketId, status);

    const ticket = tickets.find(({ id }) => id === ticketId);
    if (!ticket) {
      return;
    }
    submitTicket({ ...ticket, status });
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        submitTicket,
        changeTicketState,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
