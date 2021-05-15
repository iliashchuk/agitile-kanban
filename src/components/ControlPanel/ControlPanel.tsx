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
  Switch,
  Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { ReactComponent as SettingsIcon } from './settings.svg';

import { SprintContext } from '../../context/SprintContext';
import { ControlContext } from '../../context/ControlContext';
import { ProjectContext } from '../../context/ProjectContext';

interface Props {}

export const ControlPanel: React.FC<Props> = () => {
  const { selectedSprint, sprints, activeSprintId } = useContext(SprintContext);
  const { getProjectRelativePath } = useContext(ProjectContext);
  const { open: openSprintForm } = useContext(SprintFormContext);
  const { setIsBoardMode, isBoardMode } = useContext(ControlContext);
  const hasNoSprints = sprints.length === 0;

  let activeSprintControl = null;

  if (activeSprintId) {
    if (selectedSprint?._id === activeSprintId) {
      activeSprintControl = (
        <Flex alignItems="center">
          <Text mr="2">Board mode</Text>
          <Switch
            isChecked={isBoardMode}
            onChange={(e) => setIsBoardMode(e.target.checked)}
          />
        </Flex>
      );
    } else {
      activeSprintControl = (
        <Link to={getProjectRelativePath(`/sprint/${activeSprintId}`)}>
          <Button disabled={hasNoSprints}>Active sprint</Button>
        </Link>
      );
    }
  }

  return (
    <HStack mb="4">
      <Link to={getProjectRelativePath('/backlog')}>
        <Button>Backlog</Button>
      </Link>
      <ButtonGroup isAttached>
        <Menu>
          <MenuButton as={Button} disabled={hasNoSprints}>
            <Text isTruncated maxWidth="3xs">
              {selectedSprint ? selectedSprint.name : 'Select a Sprint'}
            </Text>
          </MenuButton>
          <MenuList maxWidth="3xs">
            {sprints.map((sprint) => (
              <Link
                key={sprint._id}
                to={getProjectRelativePath(`/sprint/${sprint._id}`)}
              >
                <MenuItem key={sprint._id}>
                  <Text isTruncated maxWidth="3xs">
                    {sprint.name}
                  </Text>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
        <Button
          borderLeft="1px solid"
          borderColor="gray.300"
          onClick={() => openSprintForm(selectedSprint?._id)}
          disabled={hasNoSprints || !selectedSprint}
        >
          <SettingsIcon width="24px" />
        </Button>
      </ButtonGroup>
      {activeSprintControl}
      <Spacer />
      <Button onClick={() => openSprintForm()}>Add new sprint</Button>
    </HStack>
  );
};
