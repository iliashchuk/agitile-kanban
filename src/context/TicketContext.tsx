import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import useFetch from 'use-http';
import querystring from 'querystring';

import { API_URL } from '../config';
import { Ticket, TicketStatus } from '../domain/Ticket';
import { ProjectContext } from './ProjectContext';
import { dispatchTaskDoneEvent } from '../communication/events';

interface ITicketContext {
  tickets: Ticket[];
  ticketsLoading: boolean;
  completeSubtask(ticketId: string, subtaskId: string): void;
  submitTicket(ticket: Ticket): Promise<Ticket>;
  changeTicketStatus(ticketId: string, status: TicketStatus): void;
}

export const TicketContext = createContext<ITicketContext>(
  {} as ITicketContext
);

export const TicketProvider: React.FC = ({ children }) => {
  const { project } = useContext(ProjectContext);
  const [tickets, _setTickets] = useState<Ticket[]>([]);
  const ticketsRef = useRef<Ticket[]>(tickets);
  const { post, put } = useFetch(`${API_URL}/ticket`);

  const setTickets = (_tickets: Ticket[]) => {
    ticketsRef.current = _tickets;
    _setTickets(_tickets);
  };

  const { loading: ticketsLoading, get } = useFetch<Ticket[]>(
    `${API_URL}/tickets`
  );

  const fetchAndSetTickets = useCallback(async () => {
    if (project) {
      const { owner, repo } = project;
      const response = await get(`?${querystring.stringify({ owner, repo })}`);

      setTickets(response);
    }
  }, [project, get]);

  const updateAndRefetchTicket = useCallback(
    async (ticket: Partial<Ticket>) => {
      await put(ticket);
      fetchAndSetTickets();
    },
    [fetchAndSetTickets, put]
  );

  const changeTicketStatus: ITicketContext['changeTicketStatus'] = useCallback(
    async (ticketId, status) => {
      try {
        await updateAndRefetchTicket({ _id: ticketId, status });
      } catch (e) {
        console.log('Failed to change ticket status', e);
      }
      dispatchTaskDoneEvent();
    },
    [updateAndRefetchTicket]
  );

  useEffect(() => {
    changeTicketStatusRef.current = changeTicketStatus;
  }, [changeTicketStatus]);

  const changeTicketStatusRef = useRef(changeTicketStatus);

  useEffect(() => {
    function handleMergeEvent({
      detail: branches,
    }: Event & { detail: string[] }) {
      console.log(branches);
      for (const branch of branches) {
        console.log(ticketsRef, ticketsRef.current);
        const branchTicket = ticketsRef.current.find(({ displayId }) => {
          console.log(branch, ticketsRef);
          return branch.includes(displayId);
        });

        if (branchTicket) {
          changeTicketStatusRef.current(branchTicket._id, TicketStatus.Review);
        }
      }
    }
    window.addEventListener(
      'merge',
      (handleMergeEvent as unknown) as EventListener
    );

    return () => {
      window.removeEventListener(
        'merge',
        (handleMergeEvent as unknown) as EventListener
      );
    };
  }, []);

  useEffect(() => {
    fetchAndSetTickets();
  }, [fetchAndSetTickets, project]);

  const submitTicket = async (ticket: Ticket) => {
    if (project) {
      const { owner, repo } = project;
      if (!ticket._id) {
        ticket = await post({ ...ticket, owner, repo });
        fetchAndSetTickets();
        return ticket;
      }
      await updateAndRefetchTicket(ticket);
    }
    return ticket;
  };

  const completeSubtask: ITicketContext['completeSubtask'] = async (
    ticketId,
    subtaskId
  ) => {
    const ticket = tickets.find(({ _id }) => _id === ticketId);
    if (!ticket?.subtasks) {
      return;
    }

    ticket.subtasks = ticket.subtasks.map((subtask) => {
      if (subtask._id === subtaskId) {
        return { ...subtask, isCompleted: true };
      }
      return subtask;
    });

    submitTicket(ticket);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        completeSubtask,
        ticketsLoading,
        submitTicket,
        changeTicketStatus,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
