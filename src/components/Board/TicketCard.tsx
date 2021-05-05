import React, { useContext } from 'react';
import { Stack, Flex, Text } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';

import { Ticket, TicketDNDTypes } from '../../domain/Ticket';
import { TypeIcon } from '../TypeIcon';
import { SubtaskList } from '../SubtaskList';
import { TicketFormContext } from '../TicketForm';

interface Props extends Ticket {}

export const TicketCard: React.FC<Props> = ({
  id,
  name,
  type,
  assignee,
  status,
  subtasks,
}) => {
  const { open } = useContext(TicketFormContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: TicketDNDTypes.TICKET,
    item: { id, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Stack
      ref={drag}
      padding="3"
      spacing="1"
      bg="white"
      cursor="pointer"
      borderRadius="lg"
      onClick={() => open({ ticketId: id })}
      opacity={isDragging ? 0.5 : 1}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <TypeIcon type={type} label={id} />
        <Text>{assignee}</Text>
      </Flex>
      <Text fontSize="large">&nbsp;{name}</Text>
      {subtasks && !!subtasks.length && (
        <SubtaskList subtasks={subtasks}></SubtaskList>
      )}
    </Stack>
  );
};