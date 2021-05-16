import { Container, Text } from '@chakra-ui/layout';
import { Button, Flex, Input } from '@chakra-ui/react';

import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../context/ProjectContext';

export const ProjectForm: React.FC = () => {
  const { projectMatchParams, createProjectWithMatchParams } = useContext(
    ProjectContext
  );
  const [prefix, setPrefix] = useState(
    projectMatchParams?.repo.substr(0, 3).toUpperCase() || ''
  );

  if (!projectMatchParams) {
    return null;
  }

  const { repo, owner } = projectMatchParams;

  return (
    <Container>
      <Text mb={4}>
        Repository <b>{repo}</b> by <b>{owner}</b> currently doesn't have an
        associated project.
      </Text>
      <Flex mb={4}>
        <Text mr={2}>To create one, confirm the project index:</Text>
        <Input
          maxLength={7}
          value={prefix}
          onChange={(e) => setPrefix(e.target.value.toUpperCase())}
        ></Input>
      </Flex>
      <Button
        colorScheme="green"
        onClick={() => createProjectWithMatchParams(prefix)}
      >
        Create project
      </Button>
    </Container>
  );
};
