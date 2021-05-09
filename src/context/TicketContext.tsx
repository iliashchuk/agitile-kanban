import React, { createContext } from 'react';
import useFetch from 'use-http';
import { API_URL } from '../config';

import { Ticket, TicketStatus } from '../domain/Ticket';

interface ITicketContext {
  tickets: Ticket[];
  ticketsLoading: boolean;
  idPrefix: string;
  submitTicket(ticket: Ticket): void;
  changeTicketState(ticketId: string, status: TicketStatus): void;
}

export const TicketContext = createContext<ITicketContext>(
  {} as ITicketContext
);

export const TicketProvider: React.FC = ({ children }) => {
  const { post, put, data: updatedData } = useFetch(`${API_URL}/ticket`);

  const { data: tickets = [], loading: ticketsLoading } = useFetch<Ticket[]>(
    `${API_URL}/tickets`,
    {},
    [updatedData]
  );

  const { data: idPrefix = '' } = useFetch<string>(
    `${API_URL}/id-prefix`,
    {},
    []
  );

  const submitTicket = async (ticket: Ticket) => {
    if (!ticket._id) {
      await post(ticket);
      return;
    }
    await put(ticket);
  };

  const changeTicketState: ITicketContext['changeTicketState'] = (
    ticketId,
    status
  ) => {
    put({ _id: ticketId, status });
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        ticketsLoading,
        idPrefix,
        submitTicket,
        changeTicketState,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
