import { Badge, BadgeProps } from '@chakra-ui/layout';
import * as React from 'react';
import { TickerType } from '../../domain/Ticket';

interface Props {
  type: TickerType;
  label?: string;
}

export const TypeIcon: React.FC<Props> = ({ type, label }) => {
  const commonProps: BadgeProps = {
    fontSize: 'medium',
    borderRadius: 'md',
  };
  switch (type) {
    case TickerType.Task:
      return (
        <Badge {...commonProps} bg="blue.300">
          {label ? label : TickerType.Task}
        </Badge>
      );
    case TickerType.Story:
      return (
        <Badge {...commonProps} bg="green.300">
          {label ? label : TickerType.Story}
        </Badge>
      );
    case TickerType.Bugfix:
      return (
        <Badge {...commonProps} bg="red.300">
          {label ? label : TickerType.Bugfix}
        </Badge>
      );
  }
};
