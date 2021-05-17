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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Avatar,
  CloseButton,
} from '@chakra-ui/react';

import { SubtaskList } from '../SubtaskList/SubtaskList';
import { TicketType, Ticket, TicketStatus } from '../../domain/Ticket';
import { ProjectContext } from '../../context/ProjectContext';
import { StoryPointRadioGroup } from './StoryPointRadioGroup';

interface Props {
  ticket?: Ticket;
  onCancel: () => void;
  onSubmit: (ticket: Ticket) => void;
}

const defaultTicket: Omit<Ticket, '_id' | 'owner' | 'repo' | 'displayId'> = {
  name: '',
  subtasks: [],
  storyPoints: 1,
  type: TicketType.Task,
  status: TicketStatus.ToDo,
};

export const TicketForm: React.FC<Props> = ({ ticket, onSubmit, onCancel }) => {
  const { project, contributors } = useContext(ProjectContext);

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
                <Flex alignItems="center">
                  <Text fontSize="md" mr="2">
                    Assignee:
                  </Text>
                  <Menu matchWidth>
                    <MenuButton textDecoration="underline">
                      {input.value || 'select a contributor'}
                    </MenuButton>
                    <MenuList>
                      {contributors.map(({ id, login, avatar_url }) => (
                        <MenuItem
                          onClick={() => input.onChange(login)}
                          key={id}
                        >
                          <Text mr={2}>{login}</Text>
                          <Avatar src={avatar_url} name={login} size="sm" />
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                  {input.value && (
                    <CloseButton
                      ml={2}
                      size="sm"
                      onClick={() => {
                        input.onChange(undefined);
                      }}
                    />
                  )}
                </Flex>
              )}
            </Field>

            {/* storyPoints */}

            <Field name="storyPoints">
              {({ input }) => (
                <Flex align="center">
                  <Text mr={4}>Story points:</Text>
                  <StoryPointRadioGroup {...input} />
                </Flex>
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
