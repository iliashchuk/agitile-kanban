import * as React from 'react';
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

import { SubtaskList } from '../SubtaskList';
import IdGenerator from '../../utils/IdGenerator';
import { TickerType, Ticket } from '../../domain/Ticket';

interface Props {
  ticket?: Ticket;
  onCancel: () => void;
  onSubmit: (ticket: Ticket) => void;
}

const defaultTicket: Omit<Ticket, 'id'> = {
  name: '',
  subtasks: [],
  type: TickerType.Task,
};

export const TicketForm: React.FC<Props> = ({ ticket, onSubmit, onCancel }) => {
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
          <option value={TickerType.Task}>{TickerType.Task}</option>
          <option value={TickerType.Story}>{TickerType.Story}</option>
          <option value={TickerType.Bugfix}>{TickerType.Bugfix}</option>
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
      initialValues={ticket ?? { ...defaultTicket, id: IdGenerator.generate() }}
    >
      {({ values, handleSubmit }) => (
        <Container p="8">
          <Stack spacing={8}>
            <Field
              name="name"
              render={({ input, meta: { error, submitFailed } }) => (
                <InputGroup size="lg">
                  <InputLeftAddon>{values.id}</InputLeftAddon>
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

            {values.type === TickerType.Story && (
              <Box textAlign="left">
                <Text mb="2" fontSize="md">
                  Subtasks:
                </Text>
                <Field name="subtasks">
                  {({ input }) => (
                    <SubtaskList
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
