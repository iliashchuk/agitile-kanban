import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Button,
  Checkbox,
  InputRightElement,
} from '@chakra-ui/react';

import { Subtask } from '../domain/Ticket';
import IdGenerator from '../utils/IdGenerator';

interface Props {
  subtasks: Subtask[];
  onChange(subtasks: Subtask[]): void;
}

export const SubtaskList: React.FC<Props> = ({ subtasks, onChange }) => {
  const [newSubtaskName, setNewSubtaskName] = useState('');

  const onEdit = (subtask: Subtask) => {
    onChange([...subtasks.filter(({ id }) => id !== subtask.id), subtask]);
  };

  const onAddNew = () => {
    onChange([
      ...subtasks,
      { name: newSubtaskName, isCompleted: false, id: IdGenerator.generate() },
    ]);
  };

  return (
    <Stack spacing="2">
      {subtasks.map((subtask) => (
        <InputGroup size="md" key={subtask.id}>
          <InputLeftAddon>{subtask.id}</InputLeftAddon>
          <Input
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

      <InputGroup size="md" alignItems="center">
        <Input
          placeholder="New subtask name"
          value={newSubtaskName}
          onChange={(e) => setNewSubtaskName(e.target.value)}
        />
        <Button size="sm" marginLeft={4} colorScheme="green" onClick={onAddNew}>
          Add
        </Button>
      </InputGroup>
    </Stack>
  );
};
