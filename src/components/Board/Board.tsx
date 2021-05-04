import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Ticket, SubtaskStatus } from '../../domain/Ticket';

interface Props {
  tickets: Ticket[];
}

export const Board: React.FC<Props> = ({ tickets }) => {
  return <Flex>this is a board</Flex>;
};

export default Board;
