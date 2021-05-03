import * as React from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { TicketForm } from './TicketForm';
import { Ticket } from '../../domain/Ticket';
import { useState } from 'react';

interface TicketFormModalContext {
  close(): void;
  open(ticket?: Ticket): void;
}

interface TicketFormModalProps {
  isOpen: boolean;
  ticket?: Ticket;
  onClose(): void;
  onOpen(): void;
}

export const TicketFormModal: React.FC<TicketFormModalProps> = ({
  isOpen,
  onClose,
  ticket,
}) => {
  const onSubmit = (submitted: Ticket) => {
    const tickets: Ticket[] = JSON.parse(
      localStorage.getItem('tickets') ?? '[]'
    );

    if (ticket) {
      const ticketIndex = tickets.findIndex(({ id }) => id === ticket.id);
      tickets[ticketIndex] = submitted;
    } else {
      tickets.push(submitted);
    }

    localStorage.setItem('tickets', JSON.stringify(tickets));

    onClose();
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent size="full">
        <TicketForm ticket={ticket} onCancel={onClose} onSubmit={onSubmit} />
      </ModalContent>
    </Modal>
  );
};

export const TicketFormContext = React.createContext<TicketFormModalContext>({
  open: () => null,
  close: () => null,
});

export const TicketFormProvider: React.FC = ({ children }) => {
  const disclosure = useDisclosure();
  const { onClose, onOpen } = disclosure;
  const [editedTicket, setEditedTicket] = useState<Ticket>();

  const open = (ticket?: Ticket) => {
    setEditedTicket(ticket);
    onOpen();
  };

  return (
    <TicketFormContext.Provider value={{ open, close: onClose }}>
      {children}
      <TicketFormModal ticket={editedTicket} {...disclosure}></TicketFormModal>
    </TicketFormContext.Provider>
  );
};
