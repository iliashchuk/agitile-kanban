import { Badge, BadgeProps } from '@chakra-ui/layout';
import * as React from 'react';
import { TicketType } from '../../domain/Ticket';

interface Props {
  type: TicketType;
  label?: string;
}

export const TypeIcon: React.FC<Props> = ({ type, label }) => {
  const commonProps: BadgeProps = {
    fontSize: 'medium',
    borderRadius: 'md',
  };
  switch (type) {
    case TicketType.Task:
      return (
        <Badge {...commonProps} bg="blue.300">
          {label ? label : TicketType.Task}
        </Badge>
      );
    case TicketType.Story:
      return (
        <Badge {...commonProps} bg="green.300">
          {label ? label : TicketType.Story}
        </Badge>
      );
    case TicketType.Bugfix:
      return (
        <Badge {...commonProps} bg="red.300">
          {label ? label : TicketType.Bugfix}
        </Badge>
      );
  }
};
