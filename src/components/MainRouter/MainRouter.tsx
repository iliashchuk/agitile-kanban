import { Container, Grid } from '@chakra-ui/react';
import { History } from 'history';
import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PROJECT_PARAMS_PATH } from '../../domain/Router';

import { ControlPanel } from '../ControlPanel';
import { Backlog } from '../Backlog';
import { ProjectContext } from '../../context/ProjectContext';

interface Props {
  history: History;
}

export const MainRouter: React.FC<Props> = ({ history }) => {
  const { getProjectRelativePath, projectParams } = useContext(ProjectContext);

  return (
    <Grid width="70vw">
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Container textAlign="center" maxW="80vw" fontSize="xl">
        <Switch>
          {projectParams && (
            <>
              <Route path={`${PROJECT_PARAMS_PATH}/sprint/:id`}>
                <ControlPanel />
                <Backlog />
              </Route>
              <Route path={`${PROJECT_PARAMS_PATH}/backlog`}>
                <ControlPanel />
                <Backlog />
              </Route>
              <Redirect to={getProjectRelativePath('/backlog')} />
            </>
          )}
        </Switch>
      </Container>
    </Grid>
  );
};
