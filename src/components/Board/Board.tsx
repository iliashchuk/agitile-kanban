import { Grid } from '@chakra-ui/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Column } from './Column';
import { Ticket, TicketStatuses } from '../../domain/Ticket';

interface Props {
  tickets: Ticket[];
}

export const Board: React.FC<Props> = ({ tickets }) => {
  console.log(TicketStatuses);
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid heigh="md" templateColumns="repeat(4, 1fr)" gap={4}>
        {TicketStatuses.map((status) => (
          <Column
            key={status}
            status={status}
            tickets={tickets.filter((ticket) => ticket.status === status)}
          ></Column>
        ))}
      </Grid>
    </DndProvider>
  );
};

export default Board;
