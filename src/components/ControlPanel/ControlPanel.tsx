import React, { useContext } from 'react';
import { HStack, Spacer } from '@chakra-ui/layout';

import { SprintFormContext } from '../SprintForm';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuItem,
  Text,
  MenuList,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as SettingsIcon } from './settings.svg';

import { SprintContext } from '../../context/SprintContext';

interface Props {}

export const ControlPanel: React.FC<Props> = () => {
  const { selectedSprint, sprints, activeSprintId } = useContext(SprintContext);
  const { open: openSprintForm } = useContext(SprintFormContext);
  const hasNoSprints = sprints.length === 0;

  return (
    <HStack mb="4">
      <NavLink to="/backlog">
        <Button>Backlog</Button>
      </NavLink>
      {activeSprintId && (
        <NavLink to={`/sprint/${activeSprintId}`}>
          <Button disabled={hasNoSprints}>Active sprint</Button>
        </NavLink>
      )}
      <ButtonGroup isAttached>
        <Menu>
          <MenuButton as={Button} disabled={hasNoSprints}>
            <Text isTruncated maxWidth="3xs">
              {selectedSprint ? selectedSprint.name : 'Select a Sprint'}
            </Text>
          </MenuButton>
          <MenuList maxWidth="3xs">
            {sprints.map((sprint) => (
              <NavLink key={sprint.id} to={`/sprint/${sprint.id}`}>
                <MenuItem key={sprint.id}>
                  <Text isTruncated maxWidth="3xs">
                    {sprint.name}
                  </Text>
                </MenuItem>
              </NavLink>
            ))}
          </MenuList>
        </Menu>
        <Button
          borderLeft="1px solid"
          borderColor="gray.300"
          onClick={() => openSprintForm(selectedSprint?.id)}
          disabled={hasNoSprints || !selectedSprint}
        >
          <SettingsIcon width="24px" />
        </Button>
      </ButtonGroup>

      <Spacer />
      <Button onClick={() => openSprintForm()}>Add new sprint</Button>
    </HStack>
  );
};
