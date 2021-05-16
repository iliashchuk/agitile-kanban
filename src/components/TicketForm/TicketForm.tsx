import React, { useContext } from 'react';
import { Form, Field } from 'react-final-form';
import {
  Container,
  Input,
  Text,
  InputGroup,
  InputLeftAddon,
  Stack,
  Select,
  InputRightAddon,
  Textarea,
  Box,
  Button,
} from '@chakra-ui/react';

import { SubtaskList } from '../SubtaskList/SubtaskList';
import { TicketType, Ticket, TicketStatus } from '../../domain/Ticket';
import { ProjectContext } from '../../context/ProjectContext';

interface Props {
  ticket?: Ticket;
  onCancel: () => void;
  onSubmit: (ticket: Ticket) => void;
}

const defaultTicket: Omit<Ticket, '_id' | 'owner' | 'repo' | 'displayId'> = {
  name: '',
  subtasks: [],
  type: TicketType.Task,
  status: TicketStatus.ToDo,
};

export const TicketForm: React.FC<Props> = ({ ticket, onSubmit, onCancel }) => {
  const { project } = useContext(ProjectContext);

  if (!project) {
    return null;
  }

  const TypeSelect = (
    <Field name="type">
      {({ input }) => (
        <Select
          size="lg"
          variant="filled"
          value={input.value}
          onChange={input.onChange}
          borderLeftRadius={0}
          isFullWidth
        >
          <option value={TicketType.Task}>{TicketType.Task}</option>
          <option value={TicketType.Story}>{TicketType.Story}</option>
          <option value={TicketType.Bugfix}>{TicketType.Bugfix}</option>
        </Select>
      )}
    </Field>
  );

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors: Partial<Record<keyof Ticket, string>> = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        return errors;
      }}
      initialValues={ticket ?? { ...defaultTicket }}
    >
      {({ values, handleSubmit }) => (
        <Container p="8">
          <Stack spacing={8}>
            <Field
              name="name"
              render={({ input, meta: { error, submitFailed } }) => (
                <InputGroup size="lg">
                  <InputLeftAddon>
                    {values.displayId ?? project.prefix}
                  </InputLeftAddon>
                  <Input
                    isInvalid={submitFailed && error}
                    placeholder="Ticket Name"
                    {...input}
                  ></Input>
                  <InputRightAddon padding="unset">
                    {TypeSelect}
                  </InputRightAddon>
                </InputGroup>
              )}
            ></Field>

            <Field name="assignee">
              {({ input }) => (
                <InputGroup alignItems="center">
                  <Text fontSize="md" mr="2">
                    Assignee:
                  </Text>
                  <Input {...input} />
                </InputGroup>
              )}
            </Field>

            {values.type === TicketType.Story && (
              <Box textAlign="left">
                <Text mb="2" fontSize="md">
                  Subtasks:
                </Text>
                <Field name="subtasks">
                  {({ input }) => (
                    <SubtaskList
                      ticketId={ticket?._id}
                      subtasks={input.value}
                      onChange={input.onChange}
                    />
                  )}
                </Field>
              </Box>
            )}

            <Field name="description">
              {({ input }) => (
                <Box textAlign="left">
                  <Text mb="2" fontSize="md">
                    Description:
                  </Text>
                  <Textarea
                    {...input}
                    placeholder="Write a short comment on what's to be done."
                  />
                </Box>
              )}
            </Field>
            <Box display="block">
              <Button
                isFullWidth
                mb="2"
                onClick={handleSubmit}
                colorScheme="green"
              >
                {ticket ? 'Save Changes' : 'Create New Ticket'}
              </Button>
              <Button isFullWidth onClick={onCancel}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </Container>
      )}
    </Form>
  );
};
