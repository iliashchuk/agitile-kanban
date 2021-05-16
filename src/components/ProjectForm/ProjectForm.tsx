import { Container, Text } from '@chakra-ui/layout';
import { Button, Flex, Input } from '@chakra-ui/react';

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <Container mt={4}>
      <Text mb={4}>
        Repository <b>{repo}</b> by <b>{owner}</b> currently doesn't have an
        associated project.
      </Text>
      <Flex mb={4} align="center">
        <Text width="100%" mr={2}>
          To create one, confirm the project index:
        </Text>
        <Input
          width="100%"
          maxLength={7}
          value={prefix}
          onChange={(e) => setPrefix(e.target.value.toUpperCase())}
        ></Input>
      </Flex>
      <Button
        mb={4}
        colorScheme="green"
        onClick={() => createProjectWithMatchParams(prefix)}
      >
        Create project
      </Button>
      <Text mb={4} fontWeight="bold">
        OR
      </Text>
      <Link to="">
        <Button>Choose another project</Button>
      </Link>
    </Container>
  );
};
