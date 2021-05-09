import * as React from 'react';
import {
  Badge,
  HStack,
  Text,
  Spacer,
  Button,
  Box,
  Stack,
} from '@chakra-ui/react';

import { TypeIcon } from '../TypeIcon';
import { useContext } from 'react';
import { TicketFormContext } from '../TicketForm';
import { TicketContext } from '../../context/TicketContext';
import { SprintContext } from '../../context/SprintContext';
import { SprintStatus } from '../../domain/Sprint';
import { Board } from '../Board';
import { ControlContext } from '../../context/ControlContext';

export const Backlog: React.FC = () => {
  const { tickets } = useContext(TicketContext);
  const { selectedSprint, activeSprintId } = useContext(SprintContext);
  const { open: openTicketForm } = useContext(TicketFormContext);
  const { isBoardMode } = useContext(ControlContext);

  const displayedTickets = selectedSprint
    ? tickets.filter((ticket) => selectedSprint.tickets.includes(ticket._id))
    : tickets;

  const isActiveSprint =
    selectedSprint && selectedSprint._id === activeSprintId;

  if (isActiveSprint && isBoardMode) {
    return <Board tickets={displayedTickets} />;
  }

  return (
    <Stack height="md" maxHeight="md">
      <Box mb="4" overflowY="auto">
        {displayedTickets.length ? (
          displayedTickets.map((ticket, index) => (
            <HStack
              padding="2"
              key={ticket._id}
              borderTopRadius={index === 0 ? 'base' : 0}
              borderBottomRadius={
                index === displayedTickets.length - 1 ? 'base' : 0
              }
              border="1px"
              borderTop={index === 0 ? '1px' : 0}
              borderColor="gray.500"
              cursor="pointer"
              onClick={() => openTicketForm({ ticketId: ticket._id })}
            >
              <TypeIcon type={ticket.type} />
              <Text fontSize="medium" fontWeight="semibold">
                {ticket.name}
              </Text>
              <Spacer />
              <Badge fontSize="large">{ticket._id}</Badge>
            </HStack>
          ))
        ) : (
          <Text fontSize="lg">{`No tickets ${
            selectedSprint ? 'in this sprint' : 'yet'
          }.`}</Text>
        )}
      </Box>
      {(!selectedSprint || selectedSprint.status === SprintStatus.Planned) && (
        <Button
          isFullWidth
          onClick={() =>
            selectedSprint
              ? openTicketForm({ parentSprintId: selectedSprint._id })
              : openTicketForm()
          }
        >
          Add new ticket
        </Button>
      )}
    </Stack>
  );
};
