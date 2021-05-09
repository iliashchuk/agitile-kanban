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
import { SprintContext } from '../../context/SprintContext';

interface ITicketFormContext {
  close(): void;
  open(options?: { ticketId?: string; parentSprintId?: string }): void;
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

export const TicketFormContext = React.createContext<ITicketFormContext>({
  open: () => null,
  close: () => null,
});

export const TicketFormProvider: React.FC = ({ children }) => {
  const disclosure = useDisclosure();
  const { onClose, onOpen } = disclosure;
  const { submitTicket } = useContext(TicketContext);
  const { addTicketToSprint } = useContext(SprintContext);
  const { tickets } = useContext(TicketContext);
  const [editedTicket, setEditedTicket] = useState<Ticket>();
  const [parentSprintId, setParentSprintId] = useState<string>();

  const open: ITicketFormContext['open'] = (options = {}) => {
    setEditedTicket(tickets.find(({ _id: id }) => id === options.ticketId));
    setParentSprintId(options.parentSprintId);
    onOpen();
  };

  const handleClose = () => {
    setEditedTicket(undefined);
    setParentSprintId(undefined);
    onClose();
  };

  const onSubmit = (ticket: Ticket) => {
    submitTicket(ticket);
    if (parentSprintId) {
      addTicketToSprint(parentSprintId, ticket._id);
    }
    handleClose();
  };

  return (
    <TicketFormContext.Provider value={{ open, close: handleClose }}>
      {children}
      <TicketFormModal
        onSubmit={onSubmit}
        ticket={editedTicket}
        {...disclosure}
      ></TicketFormModal>
    </TicketFormContext.Provider>
  );
};
