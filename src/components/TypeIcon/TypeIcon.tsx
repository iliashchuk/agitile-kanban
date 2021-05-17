import { Badge, BadgeProps } from '@chakra-ui/layout';
import React from 'react';
import { TicketType } from '../../domain/Ticket';

interface Props extends BadgeProps {
  type: TicketType;
  label?: string;
}

export const TypeIcon: React.FC<Props> = ({ type, label, ...badgeProps }) => {
  const commonProps: BadgeProps = {
    fontSize: 'medium',
    borderRadius: 'md',
  };
  switch (type) {
    case TicketType.Task:
      return (
        <Badge {...commonProps} {...badgeProps} bg="blue.300">
          {label ? label : TicketType.Task}
        </Badge>
      );
    case TicketType.Story:
      return (
        <Badge {...commonProps} {...badgeProps} bg="green.300">
          {label ? label : TicketType.Story}
        </Badge>
      );
    case TicketType.Bugfix:
      return (
        <Badge {...commonProps} {...badgeProps} bg="red.300">
          {label ? label : TicketType.Bugfix}
        </Badge>
      );
  }
};
