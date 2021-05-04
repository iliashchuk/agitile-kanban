import * as React from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { TicketForm } from './TicketForm';
import { Ticket } from '../../domain/Ticket';
import { useContext, useState } from 'react';
import { TicketContext } from '../../context/TicketContext';

interface TicketFormModalContext {
  close(): void;
  open(ticket?: Ticket): void;
}

interface TicketFormModalProps {
  isOpen: boolean;
  ticket?: Ticket;
  onSubmit(ticket: Ticket): void;
  onClose(): void;
  onOpen(): void;
}

export const TicketFormModal: React.FC<TicketFormModalProps> = ({
  isOpen,
  onClose,
  ticket,
  onSubmit,
}) => {
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
  const { submitTicket } = useContext(TicketContext);
  const [editedTicket, setEditedTicket] = useState<Ticket>();

  const open = (ticket?: Ticket) => {
    setEditedTicket(ticket);
    onOpen();
  };

  const onSubmit = (ticket: Ticket) => {
    submitTicket(ticket);
    onClose();
  };

  return (
    <TicketFormContext.Provider value={{ open, close: onClose }}>
      {children}
      <TicketFormModal
        onSubmit={onSubmit}
        ticket={editedTicket}
        {...disclosure}
      ></TicketFormModal>
    </TicketFormContext.Provider>
  );
};
