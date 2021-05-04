import * as React from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { SprintFormProps, SprintForm } from './SprintForm';
import { Sprint } from '../../domain/Sprint';
import { useContext, useState } from 'react';
import { SprintContext } from '../../context/SprintContext';

interface SprintFormModalContext {
  close(): void;
  open(Sprint?: string): void;
}

interface SprintFormModalProps extends SprintFormProps {
  isOpen: boolean;
  onClose(): void;
  onOpen(): void;
}

export const SprintFormModal: React.FC<SprintFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  sprint,
  startSprint,
  finishSprint,
}) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent size="full">
        <SprintForm
          startSprint={startSprint}
          finishSprint={finishSprint}
          sprint={sprint}
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </ModalContent>
    </Modal>
  );
};

export const SprintFormContext = React.createContext<SprintFormModalContext>({
  open: () => null,
  close: () => null,
});

export const SprintFormProvider: React.FC = ({ children }) => {
  const disclosure = useDisclosure();
  const { onClose, onOpen } = disclosure;
  const { submitSprint, setActiveSprintId, finishSprint, sprints } = useContext(
    SprintContext
  );
  const [editedSprintId, setEditedSprintId] = useState<string>();

  const open = (sprintId?: string) => {
    setEditedSprintId(sprintId);
    onOpen();
  };

  const onSubmit = (sprint: Sprint) => {
    submitSprint(sprint);
    onClose();
  };

  return (
    <SprintFormContext.Provider value={{ open, close: onClose }}>
      {children}
      <SprintFormModal
        onSubmit={onSubmit}
        startSprint={setActiveSprintId}
        finishSprint={finishSprint}
        sprint={sprints.find(({ id }) => id === editedSprintId)}
        onCancel={onClose}
        {...disclosure}
      ></SprintFormModal>
    </SprintFormContext.Provider>
  );
};
