import { Stack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { Ticket, TicketDNDTypes, TicketStatus } from '../../domain/Ticket';
import { TicketCard } from './TicketCard';
import { TicketContext } from '../../context/TicketContext';

interface Props {
  tickets: Ticket[];
  status: TicketStatus;
}

export const Column: React.FC<Props> = ({ tickets, status }) => {
  const { changeTicketState } = useContext(TicketContext);

  const [{ isOver }, drop] = useDrop<Ticket, void, { isOver: boolean }>(() => ({
    accept: TicketDNDTypes.TICKET,
    drop: ({ id, status: ticketStatus }) => changeTicketState(id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Stack
      maxHeight="100%"
      overflowY="auto"
      padding="2"
      spacing="2"
      bg={isOver ? 'gray.50' : 'gray.100'}
      borderRadius="lg"
      ref={drop}
    >
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} {...ticket}></TicketCard>
      ))}
    </Stack>
  );
};
