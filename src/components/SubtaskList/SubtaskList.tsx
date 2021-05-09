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

interface Props {
  subtasks: Subtask[];
  onChange?(subtasks: Partial<Subtask>[]): void;
}

export const SubtaskList: React.FC<Props> = ({ subtasks, onChange }) => {
  const { idPrefix } = useContext(TicketContext);
  const [newSubtaskName, setNewSubtaskName] = useState('');
  const isReadonly = !onChange;

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

  return (
    <Stack spacing="2">
      {subtasks.map((subtask) => (
        <InputGroup size="md" key={subtask._id}>
          <InputLeftAddon>{subtask._id ?? idPrefix}</InputLeftAddon>
          <Input
            disabled={isReadonly}
            value={subtask.name}
            onChange={(e) => onEdit({ ...subtask, name: e.target.value })}
          />
          <InputRightElement>
            <Checkbox
              isChecked={subtask.isCompleted}
              onChange={(e) =>
                onEdit({ ...subtask, isCompleted: e.target.checked })
              }
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
