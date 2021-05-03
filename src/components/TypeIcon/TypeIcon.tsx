import { Badge } from '@chakra-ui/layout';
import * as React from 'react';
import { TickerType } from '../../domain/Ticket';

interface Props {
  type: TickerType;
}

export const TypeIcon: React.FC<Props> = ({ type }) => {
  switch (type) {
    case TickerType.Task:
      return (
        <Badge fontSize="medium" bg="blue.300">
          {TickerType.Task}
        </Badge>
      );
    case TickerType.Story:
      return (
        <Badge fontSize="medium" bg="green.300">
          {TickerType.Story}
        </Badge>
      );
    case TickerType.Bugfix:
      return (
        <Badge fontSize="medium" bg="red.300">
          {TickerType.Bugfix}
        </Badge>
      );
  }
};
