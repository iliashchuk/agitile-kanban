import * as React from 'react';
import { Badge, HStack, Stack, Text, Spacer, Button } from '@chakra-ui/react';

import { Ticket } from '../../domain/Ticket';
import { TypeIcon } from '../TypeIcon';
import { useContext } from 'react';
import { TicketFormContext } from '../TicketForm';

export const Backlog: React.FC = () => {
  const tickets: Ticket[] = JSON.parse(localStorage.getItem('tickets') ?? '[]');

  const { open: openTicketForm } = useContext(TicketFormContext);

  console.log(tickets);

  return (
    <Stack spacing="0">
      {tickets.map((ticket, index) => (
        <HStack
          padding="2"
          key={ticket.id}
          borderTopRadius={index === 0 ? 'base' : 0}
          borderBottomRadius={index === tickets.length - 1 ? 'base' : 0}
          border="1px"
          borderTop={index === 0 ? '1px' : 0}
          borderColor="gray.500"
          cursor="pointer"
          onClick={() => openTicketForm(ticket)}
        >
          <TypeIcon type={ticket.type} />
          <Text fontSize="medium" fontWeight="semibold">
            {ticket.name}
          </Text>
          <Spacer />
          <Badge fontSize="large">{ticket.id}</Badge>
        </HStack>
      ))}
      <Button onClick={() => openTicketForm()}>Add new ticket</Button>
    </Stack>
  );
};
