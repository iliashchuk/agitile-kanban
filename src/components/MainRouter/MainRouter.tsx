import { Container, Grid, Heading } from '@chakra-ui/react';
import { History } from 'history';
import React, { useContext } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { PROJECT_PARAMS_PATH } from '../../domain/Router';

import { ControlPanel } from '../ControlPanel';
import { Backlog } from '../Backlog';
import { ProjectForm } from '../ProjectForm';
import { ProjectContext } from '../../context/ProjectContext';

interface Props {
  history: History;
}

export const MainRouter: React.FC<Props> = ({ history }) => {
  const { getProjectRelativePath, project, projectMatchParams } = useContext(
    ProjectContext
  );

  return (
    <Grid width="70vw">
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Container textAlign="center" maxW="80vw" fontSize="xl">
        <Switch>
          {projectMatchParams && (
            <>
              {!project && (
                <Route path={PROJECT_PARAMS_PATH}>
                  <ProjectForm />{' '}
                </Route>
              )}
              <Route path={`${PROJECT_PARAMS_PATH}/sprint/:id`}>
                <ControlPanel />
                <Backlog />
              </Route>
              <Route path={`${PROJECT_PARAMS_PATH}/backlog`}>
                <ControlPanel />
                <Backlog />
              </Route>
              {project && <Redirect to={getProjectRelativePath('/backlog')} />}
            </>
          )}
          <Route path="/">
            <Heading>No project selected.</Heading>
          </Route>
        </Switch>
      </Container>
    </Grid>
  );
};
