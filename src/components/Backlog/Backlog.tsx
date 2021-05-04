import * as React from 'react';
import { Badge, HStack, Stack, Text, Spacer, Button } from '@chakra-ui/react';

import { TypeIcon } from '../TypeIcon';
import { useContext } from 'react';
import { TicketFormContext } from '../TicketForm';
import { TicketContext } from '../../context/TicketContext';
import { SprintContext } from '../../context/SprintContext';

export const Backlog: React.FC = () => {
  const { tickets } = useContext(TicketContext);
  const { selectedSprint } = useContext(SprintContext);
  const { open: openTicketForm } = useContext(TicketFormContext);

  const displayedTickets = selectedSprint
    ? tickets.filter((ticket) => selectedSprint.ticketsIds.includes(ticket.id))
    : tickets;

  return (
    <Stack spacing="0">
      {displayedTickets.map((ticket, index) => (
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
