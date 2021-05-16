import React, { ReactNode, useContext } from 'react';
import {
  Box,
  Button,
  ButtonProps,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tag,
  TagCloseButton,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { Field, Form } from 'react-final-form';
import DatePicker from 'react-datepicker';
import formatDate from 'date-fns/format';

import 'react-datepicker/dist/react-datepicker.css';

import { Sprint, SprintStatus } from '../../domain/Sprint';
import { TicketContext } from '../../context/TicketContext';

export interface SprintFormProps {
  sprint?: Sprint;
  onSubmit(sprint: Sprint): void;
  startSprint(id: string): void;
  finishSprint(id: string): void;
  onCancel(): void;
}

const defaultSprint: Omit<Sprint, '_id' | 'owner' | 'repo'> = {
  name: '',
  startDate: new Date(),
  endDate: new Date(),
  status: SprintStatus.Planned,
  tickets: [],
};

export const SprintForm: React.FC<SprintFormProps> = ({
  sprint,
  onSubmit,
  onCancel,
  startSprint,
  finishSprint,
}) => {
  const { tickets } = useContext(TicketContext);

  const isDateDisabled = sprint && sprint.status === SprintStatus.Finished;
  const isTicketSelectorDisabled =
    sprint && sprint.status !== SprintStatus.Planned;

  const getSprintProgressControl = (): ReactNode => {
    const commonProps: ButtonProps = {
      size: 'lg',
      borderLeftRadius: 'none',
    };

    if (!sprint) {
      return null;
    }

    const { status, _id: id } = sprint;

    switch (status) {
      case SprintStatus.Planned:
        return (
          <Button
            {...commonProps}
            colorScheme="green"
            onClick={() => startSprint(id)}
          >
            Start
          </Button>
        );
      case SprintStatus.InProgress:
        return (
          <Button
            {...commonProps}
            colorScheme="blue"
            onClick={() => finishSprint(id)}
          >
            Finish
          </Button>
        );
      case SprintStatus.Finished:
        return <Text p="2">Sprint finished</Text>;
      default:
        return null;
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={sprint ?? defaultSprint}
      validate={(values) => {
        const errors: Partial<Record<keyof Sprint, string>> = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.startDate) {
          errors.startDate = 'Required';
        }
        if (!values.startDate) {
          errors.startDate = 'Required';
        }
        return errors;
      }}
    >
      {({ handleSubmit }) => (
        <Container p="8">
          <Stack spacing={8}>
            <Field
              name="name"
              render={({ input, meta: { error, submitFailed } }) => (
                <InputGroup size="lg">
                  <Input
                    isInvalid={submitFailed && error}
                    placeholder="Sprint Name"
                    {...input}
                  ></Input>
                  {sprint && (
                    <InputRightAddon padding="unset">
                      {getSprintProgressControl()}
                    </InputRightAddon>
                  )}
                </InputGroup>
              )}
            ></Field>

            <Flex>
              <Box mr="4">
                <Field<Sprint['startDate']> name="startDate">
                  {({ input }) => (
                    <DatePicker
                      disabled={isDateDisabled}
                      onChange={input.onChange}
                      selected={input.value}
                      customInput={
                        <InputGroup>
                          <InputLeftAddon>Start date</InputLeftAddon>
                          <Input
                            disabled={isDateDisabled}
                            readOnly
                            value={formatDate(input.value, 'dd/MM/yyyy')}
                          />
                        </InputGroup>
                      }
                    ></DatePicker>
                  )}
                </Field>
              </Box>
              <Field<Sprint['endDate']> name="endDate">
                {({ input }) => (
                  <DatePicker
                    disabled={isDateDisabled}
                    onChange={input.onChange}
                    selected={input.value}
                    customInput={
                      <InputGroup>
                        <InputLeftAddon>End date</InputLeftAddon>
                        <Input
                          disabled={isDateDisabled}
                          readOnly
                          value={formatDate(input.value, 'dd/MM/yyyy')}
                        />
                      </InputGroup>
                    }
                  ></DatePicker>
                )}
              </Field>
            </Flex>

            {!isTicketSelectorDisabled && (
              <Field<Sprint['tickets']> name="tickets">
                {({ input }) => (
                  <Box>
                    <Wrap justify={input.value.length ? 'start' : 'center'}>
                      {tickets.length > 0 ? (
                        <Menu>
                          <MenuButton size="sm" variant="outline" as={Button}>
                            Add tickets
                          </MenuButton>
                          <MenuList>
                            {tickets
                              .filter(({ _id }) => !input.value.includes(_id))
                              .map(({ displayId, _id, name }) => (
                                <MenuItem
                                  key={_id}
                                  onClick={() => {
                                    input.onChange([...input.value, _id]);
                                  }}
                                >
                                  {displayId}:&nbsp;{name}
                                </MenuItem>
                              ))}
                          </MenuList>
                        </Menu>
                      ) : (
                        <Text>Create tickets to add to the sprint.</Text>
                      )}
                      {input.value.map((ticketId) => (
                        <Tag key={ticketId}>
                          {
                            tickets.find(({ _id }) => _id === ticketId)
                              ?.displayId
                          }
                          <TagCloseButton
                            onClick={() =>
                              input.onChange(
                                input.value.filter((_id) => _id !== ticketId)
                              )
                            }
                          />
                        </Tag>
                      ))}
                    </Wrap>
                  </Box>
                )}
              </Field>
            )}

            <Box display="block">
              <Button
                isFullWidth
                mb="2"
                onClick={handleSubmit}
                colorScheme="green"
              >
                {sprint ? 'Save Changes' : 'Create New Ticket'}
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
