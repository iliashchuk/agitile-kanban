import { Container, Grid, Heading, Spinner } from '@chakra-ui/react';
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
  const {
    getProjectRelativePath,
    project,
    projectMatchParams,
    loading,
  } = useContext(ProjectContext);

  const isRelevantProjectLoaded = () => {
    if (project && projectMatchParams) {
      return (
        project.owner === projectMatchParams.owner &&
        project.repo === projectMatchParams.repo
      );
    }
  };

  if (!projectMatchParams) {
    return <Heading>No project selected.</Heading>;
  }

  if (loading) {
    return <Spinner />;
  }

  return isRelevantProjectLoaded() ? (
    <Switch>
      <Route path={`${PROJECT_PARAMS_PATH}/sprint/:id`}>
        <ControlPanel />
        <Backlog />
      </Route>
      <Route path={`${PROJECT_PARAMS_PATH}/backlog`}>
        <ControlPanel />
        <Backlog />
      </Route>
      <Redirect to={getProjectRelativePath('/backlog')} />
    </Switch>
  ) : (
    <Switch>
      <Route path={PROJECT_PARAMS_PATH}>
        <ProjectForm />
      </Route>
    </Switch>
  );
};
