import React, { useContext } from 'react';
import { Stack, Flex, Text } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';

import { Ticket, TicketDNDTypes, TicketStatus } from '../../domain/Ticket';
import { TypeIcon } from '../TypeIcon';
import { SubtaskList } from '../SubtaskList';
import { TicketFormContext } from '../TicketForm';
import { AssigneeAvatar } from '../AssigneeAvatar';

interface Props extends Ticket {}

export const TicketCard: React.FC<Props> = ({
  _id,
  displayId,
  name,
  type,
  assignee,
  status,
  subtasks,
}) => {
  const { open } = useContext(TicketFormContext);
  const isDone = status === TicketStatus.Done;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: TicketDNDTypes.TICKET,
    item: { _id, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isDone,
  }));

  return (
    <Stack
      ref={drag}
      padding="3"
      spacing="1"
      bg="white"
      cursor={isDone ? 'pointer' : 'grab'}
      borderRadius="lg"
      onClick={() => open({ ticketId: _id })}
      opacity={isDragging ? 0.5 : 1}
    >
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <TypeIcon type={type} label={displayId} />
        <AssigneeAvatar ml={2} size="xs" assigneeName={assignee} />
      </Flex>
      <Text
        isTruncated
        textDecoration={isDone ? 'line-through' : 'none'}
        fontSize="large"
      >
        {name}
      </Text>
      {subtasks && !!subtasks.length && (
        <SubtaskList ticketId={_id} subtasks={subtasks}></SubtaskList>
      )}
    </Stack>
  );
};
