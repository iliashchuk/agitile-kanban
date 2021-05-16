import React, { useContext, useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Button,
  Checkbox,
  InputRightElement,
} from '@chakra-ui/react';

import { Subtask } from '../../domain/Ticket';
import { TicketContext } from '../../context/TicketContext';
import { ProjectContext } from '../../context/ProjectContext';

interface Props {
  subtasks: Subtask[];
  ticketId?: string;
  onChange?(subtasks: Partial<Subtask>[]): void;
}

export const SubtaskList: React.FC<Props> = ({
  subtasks,
  onChange,
  ticketId,
}) => {
  const { completeSubtask } = useContext(TicketContext);
  const { project } = useContext(ProjectContext);
  const [newSubtaskName, setNewSubtaskName] = useState('');
  const isReadonly = !onChange;

  if (!project) {
    return null;
  }

  const onEdit = (subtask: Subtask) => {
    if (!onChange) {
      return;
    }
    onChange([...subtasks.filter(({ _id }) => _id !== subtask._id), subtask]);
  };

  const onAddNew = () => {
    if (!onChange) {
      return;
    }
    onChange([...subtasks, { name: newSubtaskName, isCompleted: false }]);
  };

  const handleCheckboxChange = (subtask: Subtask) => {
    if (onChange) {
      onEdit(subtask);
      return;
    }

    if (!ticketId || !subtask.isCompleted) {
      return;
    }

    completeSubtask(ticketId, subtask._id);
  };

  return (
    <Stack spacing="2" onClick={(e) => e.stopPropagation()} cursor="default">
      {subtasks.map((subtask) => (
        <InputGroup size="sm" key={subtask._id}>
          <InputLeftAddon>{subtask.displayId ?? project.prefix}</InputLeftAddon>
          <Input
            // disabled={isReadonly}
            value={subtask.name}
            onChange={(e) => onEdit({ ...subtask, name: e.target.value })}
          />
          <InputRightElement>
            <Checkbox
              isChecked={subtask.isCompleted}
              onChange={(e) => {
                handleCheckboxChange({
                  ...subtask,
                  isCompleted: e.target.checked,
                });
              }}
            />
          </InputRightElement>
        </InputGroup>
      ))}

      {!isReadonly && (
        <InputGroup size="md" alignItems="center">
          <Input
            placeholder="New subtask name"
            value={newSubtaskName}
            onChange={(e) => setNewSubtaskName(e.target.value)}
          />
          <Button
            size="sm"
            marginLeft={4}
            colorScheme="green"
            onClick={onAddNew}
          >
            Add
          </Button>
        </InputGroup>
      )}
    </Stack>
  );
};
